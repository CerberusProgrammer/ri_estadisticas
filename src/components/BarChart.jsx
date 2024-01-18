import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function BarChart({ functionUrl }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}${functionUrl}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
    }, [functionUrl]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const maxValue = Math.max(...Object.values(data).map(obj => Math.max(obj.realizadas, obj.planeado)));

    return (
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 w-full h-full">
            {Object.entries(data).map(([name, { realizadas, planeado }]) => (
                <div key={name} className="space-y-2">
                    <div className="flex space-x-2 p-4 btn btn-ghost h-full tooltip" data-tip={`Realizadas: ${realizadas}, Planeado: ${planeado}`}>
                        <div className="relative w-9 h-96 bg-orange-200 rounded">
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-orange-500 rounded"
                                style={{ height: `${(realizadas / maxValue) * 100}%` }}
                            />
                        </div>
                        <div className="relative w-9 h-96 bg-orange-200 rounded">
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-orange-500 rounded"
                                style={{ height: `${(planeado / maxValue) * 100}%` }}
                            />
                        </div>
                    </div>
                    <h2 className="font-bold text-center">{name}</h2>
                </div>
            ))}
        </div>
    );
}

export default BarChart;