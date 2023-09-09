import boto3
import json


s3 = boto3.client('s3')
rekognition = boto3.client('rekognition', region_name='us-east-1')
dynamodbTableName = 'employee'
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
employeeTable = dynamodb.Table(dynamodbTableName)
bucketname = 'long-stranger-images'


def lambda_handler(event, context):
    objectKey = event['queryStringParameters']['objectKey']
    image_bytes = s3.get_object(Bucket=bucketname, Key=objectKey)[
        'Body'].read()
    response = rekognition.search_faces_by_image(
        CollectionId='employees',
        Image={'Bytes': image_bytes}
    )
    print(response)

    for match in response['FaceMatches']:
        if (match['Similarity'] < 99.999):
            continue
        face = employeeTable.get_item(
            Key={
                'rekognitionId': match['Face']['FaceId']
            }
        )
        print(face)
        if 'Item' in face:
            print('Person Found: ', face['Item'])
            return buildResponse(200, {
                'Message': 'Success',
                'fullname': face['Item']['fullname']
            })
    print('Person could not be recognized')
    return buildResponse(403, {'Message': 'Person not found'})


def buildResponse(statusCode, body=None):
    response = {
        'statusCode': statusCode,
        'headers': {
            "Content-Type": "application/json",
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }
    if body is not None:
        response['body'] = json.dumps(body)
    return response
