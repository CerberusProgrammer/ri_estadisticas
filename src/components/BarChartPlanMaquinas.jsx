import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';
import 'daisyui/dist/full.css';

function GraficoBarras({ functionUrl }) {
    const [datos, setDatos] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}${functionUrl}/`,
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
        <div className="m-8 card shadow-xl p-4">
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                Object.entries(datos).map(([categoria, { realizadas, planeado }]) => (
                    <div key={categoria}>
                        <h2 className="text-xl font-bold">{categoria}</h2>
                        <div className="w-full h-4 bg-blue-200 rounded-full">
                            <div
                                style={{ width: `${(realizadas / (realizadas + planeado || 1)) * 100}%` }}
                                className="h-full bg-blue-600 rounded-full"
                            ></div>
                        </div>
                        <div className="w-full h-4 bg-green-200 rounded-full mt-2">
                            <div
                                style={{ width: `${(planeado / (realizadas + planeado || 1)) * 100}%` }}
                                className="h-full bg-green-600 rounded-full"
                            ></div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default GraficoBarras;
