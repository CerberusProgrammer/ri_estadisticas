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
            <div class="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p class="font-medium text-xl">{data.consecutivo}</p>
                <p>Consecutivo</p>
            </div>
            <div class="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p class="font-medium text-xl">{data.estatus}</p>
                <p>Estatus</p>
            </div>
            <div class="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p class="font-medium text-xl">{data.material.nombre}</p>
                <p class="font-medium text-sm">{data.material.espesor}</p>
                <p class="font-medium text-sm">{data.material.proveedor}</p>
                <p>Material</p>
            </div>
            <div class="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p class="font-medium text-xl">{data.piezasTotales}</p>
                <p>Piezas totales</p>
            </div>
            <div class="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p class="font-medium text-xl">{data.ordenCompra}</p>
                <p>Orden de produccion</p>
            </div>
            <div class="card bg-orange-50 w-full p-4 mb-4 shadow-md">
                <p class="font-medium text-xl">{data.fechaCreado}</p>
                <p>Fecha de creación</p>
            </div>
            <a href={data.archivo_pdf} class="card btn bg-orange-100 w-full p-4 mb-4 shadow-md">
                <p>Archivo PDF</p>
            </a>
        </div>
    );
}

export default Pieza;
