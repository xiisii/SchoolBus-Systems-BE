# This product is called "Facial Recognition." #
Link demo: [facial-aws-rekognition](https://facial-aws-rekognition.vercel.app)<br>
**Main features:**

- Registering a person's identity with their facial photo.
- Authenticating a recognized face.
---
Projects with similar functionality are quite popular on the internet, but my project focuses on learning about <ins>AWS Services</ins>. In today's digital age, platforms like Microsoft Azure and Google Cloud, especially AWS, are highly regarded. I have been studying AWS for a while, and coincidentally, Sun* Scholarship's program is related to the use of data. Therefore, I thought it was time to embark on a small project related to this technology.

Honestly, for professionals, they can complete this project in half a day. However, knowledge of AWS is advanced, and quality learning resources online are scarce. I had to explore on my own for about **four days** to complete it.

The biggest challenge in implementing this project is still the lack of quality support resources on the internet. AWS services are extensive and highly secure. When following some videos online, I constantly encountered security errors that significantly slowed down the development process. Whenever I encountered an error, I had to look up related information, so although it took quite a bit of effort, it helped me gain a better understanding of AWS.

I will explain the project workflow through the following diagram:<br>
![Picture1](https://github.com/LongTCH/Facial-AWS-Rekognition/assets/104202148/aaab7ff5-7c39-4cf1-8170-47e958dcf6dc)

AWS provides a service called Rekognition, which is an AI image analysis tool. We also use DynamoDB to store corresponding data for the analyzed faces, which in this case is the fullname. AWS Lambda function helps us achieve serverless processing of business logic without the need for a server. We have an S3 bucket to store images, and an API Gateway for clients to call the authentication API.

For the facial registration mechanism: The client will call S3 to get a presigned URL for the Employee bucket, and then use that URL to upload the image to the bucket with the image name containing accompanying information (fullname). When the image is successfully uploaded to the bucket, it triggers the Registration Lambda to process the image through Rekognition and save the information in DynamoDB.

For the facial authentication mechanism: Similarly, the client will retrieve a presigned URL and upload the image to the Visitor bucket. After the upload is complete, a notification is sent to the client, and the client will interact with the Verification Lambda through the API Gateway to retrieve the authentication information for the uploaded image.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

