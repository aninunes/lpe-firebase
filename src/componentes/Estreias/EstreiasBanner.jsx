// src/componentes/Estreias/EstreiasBanner.jsx
import React from 'react';
import './EstreiasBanner.css';

const EstreiasBanner = ({ estreias }) => {
  return (
    <div className="estreias-banner">
      <div className="estreias-marquee">
        {estreias.map((estreia) => (
          <div className="estreia-item" key={estreia.id}>
            {estreia.nome} - Estreia: {new Date(estreia.data).toLocaleDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstreiasBanner;
