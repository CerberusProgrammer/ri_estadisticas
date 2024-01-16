import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function CardContador({ functionUrl, title }) {
	const [piezasCount, setPiezasCount] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
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
		};

		fetchData();
		const intervalId = setInterval(fetchData, 5000);

		return () => clearInterval(intervalId);
	}, [functionUrl]);

	return (
		<div className="btn btn-ghost card shadow-md p-4">
			<p className="text-2xl font-semibold">{errorMessage || piezasCount}</p>
			<p className=" font-light">{title}</p>
		</div>
	);
}

export default CardContador;
