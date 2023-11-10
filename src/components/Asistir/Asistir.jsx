import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import "./Asistir.css";
import imagenTarjeta from "../../assets/tarjet.png"

const RegistroUsuarios = () => {
  const [name, setName] = useState('');
  const [asistira, setAsistira] = useState(null);

  const handleRegistro = async () => {
    try {
      // Registra al usuario en Firebase con el nombre y la asistencia
      const docRef = await addDoc(collection(db, 'usuarios'), {
        name: name,
        asistira: asistira,
      });
      console.log('Usuario registrado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const handleAsistencia = (asistira) => {
    setAsistira(asistira);
  };

  return (
    
    <div className='form'>
    
      <img
        src={imagenTarjeta}
        alt="Descripción de la imagen"
        className="imagen-tarjeta"
      />
      <div className="tarjet-text">
      <p className="text">hola soy martina y, quiero invitarte este tanto tanto a mi cumpleaños</p>
    </div>
      <div className='confirmar-container'>
      <h2>Confirmacion</h2>
      <input className='input'
        type="text"
        placeholder="ingresa tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className='confirmar-btns'>
        
      <button className='form-btn' onClick={() => handleAsistencia(true)}>Si asistiré</button>
        <button className='form-btn' onClick={() => handleAsistencia(false)}>No asistiré</button>
        <button className='form-btn' onClick={() => handleAsistencia(null)}>Quizás asistiré</button>
      
      <button onClick={handleRegistro}>Validar</button>
      </div>
      </div>
    </div>
    
  );
};

export default RegistroUsuarios;
