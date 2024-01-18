import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function TablaPiezas({ functionUrl }) {
	const [piezas, setPiezas] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/produccion/piezas/${functionUrl}/`,
				);
				const data = await response.json();
				setPiezas(data);
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
		<div className="btn btn-ghost card bg-white shadow-md p-4">
			{errorMessage ? (
				<p>{errorMessage}</p>
			) : (
				<table className="table w-full">
					<thead>
						<tr>
							<th>ID</th>
							<th>Consecutivo</th>
							<th>Estatus</th>
						</tr>
					</thead>
					<tbody>
						{piezas.map((pieza) => (
							<tr key={pieza.id}>
								<td>{pieza.id}</td>
								<td>{pieza.consecutivo}</td>
								<td>{pieza.estatus}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default TablaPiezas;
