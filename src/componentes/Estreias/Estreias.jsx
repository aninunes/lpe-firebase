// src/componentes/Estreias/Estreias.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './Estreias.css';

const Estreias = () => {
    const [estreias, setEstreias] = useState([]);

    useEffect(() => {
        const fetchEstreias = async () => {
            try {
                const estreiasCollection = collection(db, "estreias");
                const snapshot = await getDocs(estreiasCollection);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEstreias(data);
            } catch (error) {
                console.error("Erro ao buscar estreias:", error);
            }
        };

        fetchEstreias();
    }, []);

    return (
        <div className="estreias-container">
            <h3 className="section-title">Estreias Fictícias</h3>
            <ul className="estreias-list">
                {estreias.map((estreia) => (
                    <li key={estreia.id} className="estreia-item">
                        <h4 className="estreia-title">{estreia.titulo}</h4>
                        <p className="estreia-date">{estreia.data_estreia}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Estreias;
