import React from 'react';
import Register from './pages/Register';
import Hoom from './pages/Hoom';
import Verify from './pages/Verify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className="App">
			<ToastContainer
				position="top-center"
				hideProgressBar
				newestOnTop
				autoClose={2000}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				transition={Zoom}
				pauseOnHover
				theme="light"
				style={{ fontSize: 18 }}
			/>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Hoom />} />
					<Route path="/upload" element={<Register />} />
					<Route path="/verify" element={<Verify />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
