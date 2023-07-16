import aws from 'aws-sdk';

const REGION = 'us-east-1';
const BUCKET_EMPLOYEE = 'long-employee-images';
const BUCKET_STRANGER = 'long-stranger-images';
const ACCESS_KEY_ID = 'AKIA3EJ2VLVDESAXC47U';
const ACCESS_KEY_SECRET = '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';

const s3 = new aws.S3({
	region: REGION,
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: ACCESS_KEY_SECRET,
	signatureVersion: 'v4',
});

export async function generateUploadURLForEmployee(imageName) {
	const params = {
		Bucket: BUCKET_EMPLOYEE,
		Key: imageName,
		Expires: 60,
	};

	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
}

export async function generateUploadURLForStranger(imageName) {
	const params = {
		Bucket: BUCKET_STRANGER,
		Key: imageName,
		Expires: 60,
	};

	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
}
