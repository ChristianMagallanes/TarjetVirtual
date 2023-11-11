import React, { useState, useEffect } from 'react';
import imagenTarjeta from "./assets/tarjet.png";
import Asistir from './components/Asistir/Asistir';
import "./App.css";

function App() {
  const [typedText, setTypedText] = useState('');
  const [originalText, setOriginalText] = useState('hola soy martina y, quiero invitarte este tanto tanto a mi cumpleaños te invito a mi cumpleaños de 15 espero q la pasemos muy bien ekisde ekisde ekisde ajsdjasdas ay va la bala tajala la wea sucia ekisde por q xd xd exde mi primera chamba');
  const [showAsistir, setShowAsistir] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedText(originalText.substring(0, typedText.length + 1));
    }, 50);

    // Mostrar el botón después de 10 segundos
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 150);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [typedText, originalText]);

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

      {showButton && (
        <div className='confirma-btn-container'>
          <button className='btn' onClick={() => setShowAsistir(true)}>
            Confirma ahora
          </button>
        </div>
      )}

      {showAsistir && <div className="full-screen-container"><Asistir /></div>}
    </div>
  );
}

export default App;
