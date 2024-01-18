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
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(data).map(([name, { realizadas, planeado }]) => (
                <div key={name} className="space-y-2">
                    <h2 className="font-bold">{name}</h2>
                    <div className="relative h-64 w-6 mx-auto bg-orange-200">
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-orange-500"
                            style={{ height: `${(realizadas / maxValue) * 100}%` }}
                        />
                    </div>
                    <div className="relative h-64 w-6 mx-auto bg-orange-200">
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-orange-500"
                            style={{ height: `${(planeado / maxValue) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BarChart;
