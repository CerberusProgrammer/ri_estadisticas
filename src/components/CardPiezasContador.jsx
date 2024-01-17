import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function CardContador({ functionUrl, title, pageUrl }) {
	const [piezasCount, setPiezasCount] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`${API_URL}/api/produccion/piezas/${functionUrl}/`,
				);
				const data = await response.json();
				setPiezasCount(data.piezas);
				setErrorMessage('');
			} catch (error) {
				setErrorMessage(error.message);
			}
			setIsLoading(false);
		};

		fetchData();
		const intervalId = setInterval(fetchData, 5000);

		return () => clearInterval(intervalId);
	}, [functionUrl]);

	const handleClick = () => {
		// Aquí puedes manejar el evento de clic
		window.location.href = pageUrl;
	};

	return (
		<div className="btn btn-ghost card bg-orange-50 shadow-md h-14 p-4">
			{isLoading ? (
				<span className="loading loading-spinner text-secondary"></span>
			) : errorMessage ? (
				<p>{errorMessage}</p>
			) : (
				<button
					onClick={handleClick}
					className="w-full h-full flex flex-col justify-center items-center"
				>
					<p className="text-2xl font-semibold">{piezasCount}</p>
					<p className="font-normal">{title}</p>
				</button>
			)}
		</div>
	);
}

export default CardContador;
