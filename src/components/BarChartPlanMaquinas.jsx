import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function GraficoBarras({ functionUrl }) {
    const [datos, setDatos] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}${functionUrl}`,
                );
                const data = await response.json();
                setDatos(data);
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
        <div className="m-4 card shadow-xl p-4">
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                Object.entries(datos).map(([categoria, { realizadas, planeado }]) => (
                    <div key={categoria}>
                        <h2 className="text-xl font-bold">{categoria}</h2>
                        <div className="w-full h-4 bg-yellow-200 rounded-full">
                            <div
                                style={{ width: `${realizadas > 0 ? (realizadas / (realizadas + planeado)) * 100 : 0}%` }}
                                className="h-full bg-yellow-600 rounded-full"
                            ></div>
                        </div>
                        <div className="w-full h-4 bg-orange-200 rounded-full mt-2">
                            <div
                                style={{ width: `${planeado > 0 ? (planeado / (realizadas + planeado)) * 100 : 0}%` }}
                                className="h-full bg-orange-600 rounded-full"
                            ></div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default GraficoBarras;
