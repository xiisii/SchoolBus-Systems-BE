# This product is called "Facial Recognition." #
Link demo: [facial-aws-rekognition](https://facial-aws-rekognition.vercel.app)<br>
**Main features:**

- Registering a person's identity with their facial photo.
- Authenticating a recognized face.
---
Projects with similar functionality are quite popular on the internet, but my project focuses on learning about [AWS Services](https://aws.amazon.com/). In today's digital age, platforms like Microsoft Azure and Google Cloud, especially AWS, are highly regarded. 

The biggest challenge in implementing this project is still the lack of quality support resources on the internet. AWS services are extensive and highly secure. When following some videos online, I constantly encountered security errors that significantly slowed down the development process. Whenever I encountered an error, I had to look up related information, so although it took quite a bit of effort, it helped me gain a better understanding of AWS.

I will explain the project workflow through the following diagram:<br>
![Picture1](https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/aaab7ff5-7c39-4cf1-8170-47e958dcf6dc)

AWS provides a service called Rekognition, which is an AI image analysis tool. We also use DynamoDB to store corresponding data for the analyzed faces, which in this case is the fullname. AWS Lambda function helps us achieve serverless processing of business logic without the need for a server. We have an S3 bucket to store images, and an API Gateway for clients to call the authentication API.

For the facial registration mechanism: The client will call S3 to get a presigned URL for the Employee bucket, and then use that URL to upload the image to the bucket with the image name containing accompanying information (fullname). When the image is successfully uploaded to the bucket, it triggers the Registration Lambda to process the image through Rekognition and save the information in DynamoDB.

For the facial authentication mechanism: Similarly, the client will retrieve a presigned URL and upload the image to the Visitor bucket. After the upload is complete, a notification is sent to the client, and the client will interact with the Verification Lambda through the API Gateway to retrieve the authentication information for the uploaded image.

### Demo:

If you haven't registered your face, the authentication process will fail.<br>
<img width="332" alt="image" src="https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/56f1d21a-e083-4c29-b696-ffaea2497548">  <img width="336" alt="image" src="https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/b7a8727e-ffb9-4d46-9cb8-3fe7493d2673"><br>

Let's try registering your face by taking a photo and entering your name, then choose upload.<br>
Then, go back to the authentication page and try with a different photo of yourself.<br>
<img width="337" alt="image" src="https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/61b6be2c-50c7-428a-9cd7-a21406f6898e">
<img width="346" alt="image" src="https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/b9f0ac5f-874b-446d-8469-2d4659c55775"><br>

**Awesome. It worked!**<br>
<img width="179" alt="image" src="https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/7f1665b7-2852-4bd5-a513-f1c99d3f75b5">

