import React, { useState, useEffect } from 'react';
import imagenTarjeta from "./assets/tarjet.png";
import Asistir from './components/Asistir/Asistir';
import "./App.css";

function App() {
  const [typedText, setTypedText] = useState('');
  const [originalText,] = useState(`Queridos amigos y familiares,

  Estamos emocionados de invitarlos a los Quince Años de [Nombre].
  
  Fecha: Fecha del Evento
  Hora: Hora del Evento
  Lugar: Dirección del Evento
  
  Únanse a nosotros para disfrutar de una noche llena de risas, música, baile y momentos inolvidables.
  
  Esperamos contar con su asistencia para compartir la alegría de este día tan especial.
  
  ¡Nos vemos allí!
  
  Con cariño,
  [Su Nombre]`);
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

  const handleCerrarAsistir = () => {
    setShowAsistir(false);
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

      {showButton && (
        <div className='confirma-btn-container'>
          <button className='btn' onClick={() => setShowAsistir(true)}>
            Confirma ahora
          </button>
        </div>
      )}

      {showAsistir && (
        <div className="full-screen-container">
          <Asistir />
          <button className='cerrar-btn' onClick={handleCerrarAsistir}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
