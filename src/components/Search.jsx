import React, { useState, useEffect } from 'react';
import { API_URL } from '../settings/config.js';

function Search({ }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (query.length < 1) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/produccion/piezas/?search=${query}`,
                );
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [query]);

    const handleSelect = (id, consecutivo) => {
        setSelected({ id, consecutivo });
        setResults([]);
        window.location.href = `/piezas/${id}`; // Navega a la nueva página
    };

    return (
        <div className="form-control relative">
            <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-auto md:w-56"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <div className="absolute bg-white shadow-md rounded-md p-2 mt-8 z-10"> {/* Agrega margen superior */}
                    {results.map(({ id, consecutivo }) => (
                        <p
                            key={id}
                            className="p-1 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(id, consecutivo)}
                        >
                            {consecutivo}
                        </p>
                    ))}
                </div>
            )}
            {selected && (
                <p>Has seleccionado la máquina con el consecutivo: {selected.consecutivo}</p>
            )}
        </div>
    );
}

export default Search;
