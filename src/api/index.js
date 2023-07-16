import axios from 'axios';
import {
	generateUploadURLForEmployee,
	generateUploadURLForStranger,
} from './s3';

export const putImageToEmployee = async (image, name) => {
	const url = await generateUploadURLForEmployee(name);
	const res = await axios.put(url, image, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return res;
};

export const putImageToStranger = async (image, name) => {
	const url = await generateUploadURLForStranger(name);
	const res = await axios.put(url, image, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return res;
};

export const authenticateImage = async (objectKey) => {
	const res = await axios.get(
		`https://352ljzdj35.execute-api.us-east-1.amazonaws.com/dev/employee?objectKey=${objectKey}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	return res;
};
