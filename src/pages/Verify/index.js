import { authenticateImage, putImageToStranger } from 'api';
import React, { useCallback, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { v4 } from 'uuid';
import './Verify.css';

function Verify() {
	const webcamRef = useRef(null);
	const [strangerImageName, setStrangerImageName] = useState('');
	const [imageSrc, setImageSrc] = useState('');
	const [spinner, setSpinner] = useState(false);

	const capture = useCallback(() => {
		setImageSrc(webcamRef?.current?.getScreenshot());
	}, [webcamRef]);

	const verify = async (e) => {
		e.preventDefault();
		if (!imageSrc) {
			toast.warn('You need an image to verify!');
			return;
		}
		const base64Response = await fetch(imageSrc);
		const imageName = `${v4()}.jpeg`;
		setStrangerImageName(imageName);
		const imageBlob = await base64Response.blob();
		const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
		setSpinner(true);
		try {
			const res = await putImageToStranger(imageFile, imageName);
			const response = await authenticate(imageName);
			if (response.Message === 'Success') {
				toast.success(`Hi ${response.fullname}, welcome to work!`);
				setImageSrc('');
			}
		} catch (error) {
			if (error.response.status === 403)
				toast.error('You are not authenticated');
			else toast.error('Something went wrong! Please try again');
		}
		setSpinner(false);
	};

	const authenticate = async (image) => {
		const res = await authenticateImage(image);
		return res.data;
	};

	return (
		<div className="d-flex justify-content-center flex-column align-items-center register-page">
			<p className="register-header">VERIFY</p>
			<div className="d-flex flex-column justify-content-center align-items-center">
				<Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
				<button className="camera-button" onClick={capture}>
					<i className="fa-solid fa-camera" style={{ fontSize: 30 }}></i>
				</button>
			</div>
			{imageSrc && (
				<div className="d-flex flex-column justify-content-center align-items-center position-absolute">
					<img className="camera-center" src={imageSrc} />
					<button
						className="camera-button camera-button--clear"
						onClick={() => setImageSrc('')}
					>
						<i className="fa-solid fa-xmark" style={{ fontSize: 30 }}></i>
					</button>
				</div>
			)}

			<div className="d-flex justify-content-center mb-5">
				<button className="verify-page btn-verify" onClick={verify}>
					Verify
				</button>
				<ColorRing
					visible={spinner}
					ariaLabel="blocks-loading"
					wrapperStyle={{}}
					height={35}
					width={35}
					wrapperClass="blocks-wrapper"
					colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
				/>
			</div>
		</div>
	);
}

export default Verify;
