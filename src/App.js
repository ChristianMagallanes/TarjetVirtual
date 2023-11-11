import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imagenTarjeta from "./assets/tarjet.png";
import "./App.css";
import Asistir from './components/Asistir/Asistir';

function App() {
  const [typedText, setTypedText] = useState('');
  const [originalText, setOriginalText] = useState('hola soy martina y, quiero invitarte este tanto tanto a mi cumpleaños te invito a mi cumpleaños de 15 espero q la pasemos muy bien ekisde ekisde ekisde ajsdjasdas ay va la bala tajala la wea sucia ekisde por q xd xd exde mi primera chamba');
  const [showAsistir, setShowAsistir] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedText(originalText.substring(0, typedText.length + 1));
    }, 50);

    return () => clearInterval(interval);
  }, [typedText, originalText]);

  const handleShowAsistir = () => {
    setShowAsistir(true);
  };

  return (
    <div className='container'>
      <img
        src={imagenTarjeta}
        alt="Descripción de la imagen"
        className="imagen-tarjeta"
      />
      <div className="tarjet-text">
        <p className="text">{typedText}</p>
      </div>
      {!showAsistir && (
        <button className='btn' onClick={handleShowAsistir}>
          confirmar
        </button>
      )}
      {showAsistir && <Asistir />}
    </div>
  );
}

export default App;
