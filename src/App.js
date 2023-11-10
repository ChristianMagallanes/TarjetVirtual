import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import RegistroUsuarios from './components/Asistir/Asistir';
import UsuariosRegistrados from './components/Registros/Registros';
import "./App.css";

import backgroundMusic from './music.mp3'; // Reemplaza con la ruta correcta de tu canción

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    // Crear el elemento de audio
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    setAudioElement(audio);

    // Ocultar el mensaje de bienvenida después de 5 segundos
    const timeout = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => {
      // Detener la música de fondo cuando el componente se desmonta
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      clearTimeout(timeout);
    };
  }, []);

  const handlePlayButtonClick = () => {
    // Reproducir la música al hacer clic en el botón
    if (audioElement) {
      audioElement.play();
    }
  };

  return (
    <div className='container'>
      <CSSTransition
        in={showWelcome}
        timeout={300}
        classNames="welcome"
        unmountOnExit
      >
        <div className='welcome-message'>
          <div className='welcome-text'>Bienvenido</div>
          <button onClick={handlePlayButtonClick}>Reproducir</button>
        </div>
      </CSSTransition>
      <RegistroUsuarios />
      <UsuariosRegistrados />
    </div>
  );
}

export default App;
