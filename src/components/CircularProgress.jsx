import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function CircularProgressComponent({ functionUrl, title }) {
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

    const CircularProgress = ({ value = 0 }) => {
        const radius = 50;
        const strokeWidth = 15;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (value / 100) * circumference;

        return (
            <svg height="120" width="120">
                <circle
                    stroke="orange"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset, strokeLinecap: "round" }}
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill="rgba(0, 0, 0, 0.6)"
                    dy=".3em"
                >
                    {`${value}%`}
                </text>
            </svg>
        );
    };

    return (
        <div className="m-4 card shadow-xl p-4">
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <CircularProgress
                            value={datos.progreso}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CircularProgressComponent;
