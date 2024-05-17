import boto3
import json


s3 = boto3.client('s3')
rekognition = boto3.client('rekognition', region_name='us-east-1')
dynamodbTableName = 'employees'
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
employeeTable = dynamodb.Table(dynamodbTableName)
bucketname = 'long-stranger-images'


def lambda_handler(event, context):
    objectKey = event['queryStringParameters']['objectKey']
    response = rekognition.search_faces_by_image(
        CollectionId='employees',
        Image={'S3Object': {'Bucket': bucketname, 'Name': objectKey}},
    )
    # print(response)
    face_list = []
    for match in response['FaceMatches']:
        face = employeeTable.get_item(
            Key={
                'rekognitionId': match['Face']['FaceId']
            }
        )
        if 'Item' in face:
            face_list.append({
                "employeeId": face['Item']['employeeId'],
                "confidence": match['Similarity']
            })

    return buildResponse(200, {
        'Message': 'Success',
        'FaceList': face_list
    })


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
