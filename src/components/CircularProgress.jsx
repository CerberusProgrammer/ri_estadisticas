import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function CircularProgressComponent({ functionUrl, title, functionAPI: goTo }) {
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
        const strokeWidth = 20;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (value / 100) * circumference;

        return (
            <svg height="120" width="120">
                <circle
                    stroke="orange"
                    fill="orange"
                    strokeWidth={10}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset, strokeLinecap: "round", opacity: 0.1 }}
                    r={radius}
                    cx="60"
                    cy="60"
                />
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
                    {`${value.toFixed(2)}%`}
                </text>
            </svg>
        );
    };


    return (
        <a href={`${goTo}`} className="btn btn-ghost card bg-white shadow-md w-full h-56 flex justify-center items-center" >
            {
                errorMessage ? (
                    <p> {errorMessage}</p >
                ) : datos ? (
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl text-gray-500 font-bold">{title}</h2>
                        <div className="w-full p-4 flex justify-center">
                            <CircularProgress
                                value={datos.progreso}
                            />
                        </div>
                    </div>
                ) : (
                    <span class="loading loading-spinner text-secondary"></span>
                )
            }
        </a >
    );

}

export default CircularProgressComponent;
