import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Hoom() {
	const navigate = useNavigate();

	return (
		<div className="d-flex flex-column justify-content-center align-items-center w-100 home-page">
			<p className="app-header">Hoang Long Inc. Facial Recognition</p>
			<div className="d-flex justify-content-center flex-column info-card">
				<div className="info-card-top">
					<div className="d-flex align-items-center info-header">
						<i
							className="fa-solid fa-info"
							style={{ color: '#007bff', fontSize: 18 }}
						></i>
						<p className="info-header-text">How to use</p>
					</div>
					<ul className="list-info">
						<li>Click "Register" if you want to add a face to recognition</li>
						<li>Click "Verify" if you want to verify a face</li>
					</ul>
				</div>
				<button
					className="home-page__button btn-register"
					onClick={() => navigate('/upload')}
				>
					Register
				</button>
				<button
					className="home-page__button btn-verify"
					onClick={() => navigate('/verify')}
				>
					Verify
				</button>
			</div>
		</div>
	);
}

export default Hoom;
