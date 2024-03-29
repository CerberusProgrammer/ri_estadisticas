import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function CardContador({ functionUrl, title, pageUrl }) {
	const [piezasCount, setPiezasCount] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/produccion/piezas/${functionUrl}/`,
				);
				const data = await response.json();
				setPiezasCount(data.piezas);
				setErrorMessage('');
				setIsLoading(false);
			} catch (error) {
				setErrorMessage(error.message);
				setIsLoading(false);
			}
		};

		fetchData();
		const intervalId = setInterval(fetchData, 5000);

		return () => clearInterval(intervalId);
	}, [functionUrl]);

	const handleClick = () => {
		window.location.href = pageUrl;
	};

	return (
		<button onClick={handleClick} className="btn btn-ghost card bg-white shadow-md w-full h-14 p-12">
			{isLoading ? (
				<p>Cargando...</p>
			) : errorMessage ? (
				<p>{errorMessage}</p>
			) : (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<p className="text-4xl text-secondary font-semibold">{piezasCount}</p>
					<p className="font-bold text-gray-500 pt-2">{title}</p>
				</div>
			)}
		</button>
	);
}

export default CardContador;
