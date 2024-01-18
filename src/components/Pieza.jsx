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
        return <div>Cargando...</div>;
    }

    const steps = ["diseño", "material", "nesteos", "procesos", "produccion", "operador", "realizado", "calidad", "completado"];

    return (
        <div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.consecutivo || "Sin consecutivo"}</p>
                <p>Consecutivo</p>
            </div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.estatus || "Sin estatus"}</p>
                <div className="lg:block hidden w-full">
                    <ul className="steps">
                        {steps.map(step => (
                            <li className={`step ${data.estados[step] === "realizado" ? "step-secondary" : ""}`}>
                                <p className="text-xl">{step.charAt(0).toUpperCase() + step.slice(1)}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:hidden block">
                    <ul className="steps steps-vertical">
                        {steps.map(step => (
                            <li className={`step ${data.estados[step] === "realizado" ? "step-secondary" : ""}`}>
                                <p className="text-xl">{step.charAt(0).toUpperCase() + step.slice(1)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p>Estatus</p>
            </div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.material.nombre || "Sin material"}</p>
                <p className="font-medium text-sm">{data.material.espesor || "Sin espesor"}</p>
                <p className="font-medium text-sm">{data.material.proveedor || "Sin proveedor"}</p>
                <p>Material</p>
            </div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <ul>
                    {data.placas.length > 0 ? data.placas.map(placa => (
                        <li>
                            <p className="font-medium text-xl">Nesteo {placa['id']}</p>
                        </li>
                    )) : <p className="font-medium text-xl">Sin nesteos</p>}
                </ul>
                <p>Nesteos</p>
            </div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.piezasTotales || "Sin piezas totales"}</p>
                <p>Piezas totales</p>
            </div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.ordenCompra || "Sin orden de producción"}</p>
                <p>Orden de producción</p>
            </div>
            <div className="card bg-white w-full p-4 mb-4 shadow-md">
                <p className="font-medium text-xl">{data.fechaCreado || "Sin fecha de creación"}</p>
                <p>Fecha de creación</p>
            </div>
            <a href={API_URL + data.archivo_pdf || "#"} className="card btn bg-white w-full p-4 shadow-md">
                <p>{data.archivo_pdf ? "Archivo PDF" : "Sin archivo PDF"}</p>
            </a>
        </div>
    );
}

export default Pieza;
