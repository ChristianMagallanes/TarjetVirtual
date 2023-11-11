import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import Swal from 'sweetalert2';
import "./Asistir.css";

const Asistir = () => {
  const [name, setName] = useState('');
  const [asistira, setAsistira] = useState(null);

  const handleRegistro = async () => {
    try {
      if (!name || asistira === null) {
        // Mostrar SweetAlert indicando que se debe ingresar un nombre y seleccionar una opción
        Swal.fire({
          icon: 'warning',
          title: 'Por favor, complete los campos',
          text: 'Ingrese su nombre y seleccione una opción de confirmación.',
        });
        return;
      }

      // Registra al usuario en Firebase con el nombre y la asistencia
      const docRef = await addDoc(collection(db, 'usuarios'), {
        name: name,
        asistira: asistira,
      });
      console.log('Usuario registrado con ID:', docRef.id);

      // Limpiar el campo de nombre después de la validación
      setName('');

      // Limpiar el estado de asistira
      setAsistira(null);

      // Mostrar SweetAlert de agradecimiento
      Swal.fire({
        icon: 'success',
        title: '¡Muchas gracias por confirmar!',
        text: 'Esperamos verte en nuestro evento.',
      });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const handleAsistencia = (asistira) => {
    setAsistira(asistira);
  };

  const handleValidar = () => {
    // Verificar si se ha ingresado un nombre y se ha seleccionado una opción antes de validar
    if (name && asistira !== null) {
      // Lógica para validar
      handleRegistro();
    } else {
      // Mostrar SweetAlert indicando que se debe ingresar un nombre y seleccionar una opción
      Swal.fire({
        icon: 'warning',
        title: 'Por favor, complete los campos',
        text: 'Ingrese su nombre y seleccione una opción de confirmación.',
      });
    }
  };

  const handleCompartirWhatsApp = () => {
    // Construir el mensaje para compartir en WhatsApp
    const mensaje = `¡Hola! Acabo de confirmar mi asistencia a la página de Festejando Mis 15. ¿Te gustaría unirte? Visita: https://festejando-mis-15.netlify.app/`;

    // Crear el enlace de WhatsApp con el mensaje
    const enlaceWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;

    // Abrir la ventana de WhatsApp para compartir el mensaje
    window.open(enlaceWhatsApp, '_blank');
  };

  return (
    <div className='form'>
      <div className='confirmar-container'>
        <h2>Confirmacion</h2>
        <input
          className='input'
          type="text"
          placeholder="ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className='confirmar-btns'>
          <button className={`form-btn yes ${asistira === true ? 'active' : ''}`} onClick={() => handleAsistencia(true)}>
            Si asistiré
          </button>
          <button className={`form-btn no ${asistira === false ? 'active' : ''}`} onClick={() => handleAsistencia(false)}>
            No asistiré
          </button>
          
          <button className="validar-btn" onClick={handleValidar}>
            Validar
          </button>

          <button className="compartir-whatsapp-btn" onClick={handleCompartirWhatsApp}>
            Compartir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Asistir;
