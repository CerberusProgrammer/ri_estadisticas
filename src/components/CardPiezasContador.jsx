import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function CardContador({ functionUrl }) {
	const [piezasCount, setPiezasCount] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/produccion/piezas/${functionUrl}/`,
				);
				const data = await response.json();
				setPiezasCount(data.contador_piezas_aprobadas);
				setErrorMessage('');
			} catch (error) {
				setErrorMessage(error.message);
			}
		};

		fetchData();
		const intervalId = setInterval(fetchData, 5000);

		// Limpiar el intervalo cuando el componente se desmonte
		return () => clearInterval(intervalId);
	}, [functionUrl]);

	return (
		<div className="border-2 border-gray-300 p-4 rounded-md">
			<h2 className="text-xl font-bold">Piezas Actuales</h2>
			<p className="text-2xl font-semibold">{errorMessage || piezasCount}</p>
		</div>
	);
}

export default CardContador;
