import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function Pieza({ id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/produccion/piezas/${id}/ver_pieza_para_estadistico/`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.consecutivo}</p>
                <p>Consecutivo</p>
            </div>
            <div className="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.estatus}</p>
                <div className="md:block hidden">
                    <ul className="steps w-full">
                        <li className="step step-secondary"><p className="text-xl">Diseño</p></li>
                        <li className="step"><p className="text-xl">Material</p></li>
                        <li className="step"><p className="text-xl">Nesteo</p></li>
                        <li className="step"><p className="text-xl">Procesos</p></li>
                        <li className="step"><p className="text-xl">Produccion</p></li>
                        <li className="step"><p className="text-xl">Operador</p></li>
                        <li className="step"><p className="text-xl">Realizado</p></li>
                        <li className="step"><p className="text-xl">Calidad</p></li>
                        <li className="step"><p className="text-xl">Completado</p></li>
                    </ul>
                </div>

                <div className="md:hidden block">
                    <ul className="steps steps-vertical">
                        <li className="step step-secondary"><p className="text-xl">Diseño</p></li>
                        <li className="step"><p className="text-xl">Material</p></li>
                        <li className="step"><p className="text-xl">Nesteo</p></li>
                        <li className="step"><p className="text-xl">Procesos</p></li>
                        <li className="step"><p className="text-xl">Produccion</p></li>
                        <li className="step"><p className="text-xl">Operador</p></li>
                        <li className="step"><p className="text-xl">Realizado</p></li>
                        <li className="step"><p className="text-xl">Calidad</p></li>
                        <li className="step"><p className="text-xl">Completado</p></li>
                    </ul>
                </div>
                <p>Estatus</p>
            </div>
            <div className="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.material.nombre}</p>
                <p className="font-medium text-sm">{data.material.espesor}</p>
                <p className="font-medium text-sm">{data.material.proveedor}</p>
                <p>Material</p>
            </div>
            <div className="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.piezasTotales}</p>
                <p>Piezas totales</p>
            </div>
            <div className="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.ordenCompra}</p>
                <p>Orden de produccion</p>
            </div>
            <div className="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.fechaCreado}</p>
                <p>Fecha de creación</p>
            </div>
            <a href={data.archivo_pdf} className="card btn bg-orange-100 w-full p-4 mb-4 shadow-md">
                <p>Archivo PDF</p>
            </a>
        </div>
    );
}

export default Pieza;
