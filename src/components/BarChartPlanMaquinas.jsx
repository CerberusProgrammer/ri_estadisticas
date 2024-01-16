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
        <div className="m-4 bg-orange-50 card shadow-md p-4">
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                Object.entries(datos).map(([categoria, { realizadas, planeado }]) => (
                    <div key={categoria}>
                        <h2 className="text-xl font-bold">{categoria}</h2>
                        <div className="w-full h-8 bg-yellow-100 rounded-full relative">
                            <div
                                style={{ width: `${realizadas > 0 ? (realizadas / (realizadas + planeado)) * 100 : 0}%` }}
                                className="h-full bg-yellow-600 rounded-full"
                            ></div>
                            {realizadas > 0 && (
                                <span className="absolute inset-0 flex items-center justify-center text-sm">
                                    {`${realizadas} ${realizadas > 1 ? 'piezas' : 'pieza'}`}
                                </span>
                            )}
                        </div>
                        <div className="w-full h-8 bg-orange-100 rounded-full mt-2 relative">
                            <div
                                style={{ width: `${planeado > 0 ? (planeado / (realizadas + planeado)) * 100 : 0}%` }}
                                className="h-full bg-orange-400 rounded-full"
                            ></div>
                            {planeado > 0 && (
                                <span className="absolute inset-0 flex items-center justify-center text-sm">
                                    {`${planeado} ${planeado > 1 ? 'piezas' : 'pieza'}`}
                                </span>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default GraficoBarras;
