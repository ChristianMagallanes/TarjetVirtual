import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import "./Asistir.css";

const Asistir = () => {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [asistira, setAsistira] = useState(null);

  const handleRegistro = async () => {
    try {
      if (!name || !apellido || asistira === null) {
        // Mostrar SweetAlert indicando que se debe ingresar un nombre, apellido y seleccionar una opción
        Swal.fire({
          icon: 'warning',
          title: 'Por favor, complete los campos',
          text: 'Ingrese su nombre, apellido y seleccione una opción de confirmación.',
        });
        return;
      }

      // Verificar si el nombre y apellido ya están en la base de datos
      const querySnapshot = await getDocs(query(collection(db, 'usuarios'), where('name', '==', name), where('apellido', '==', apellido)));

      if (querySnapshot.size > 0) {
        // Si el nombre y apellido ya existen, mostrar un mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: '¡El nombre y apellido ya están registrados! Por favor, intenta con otro.',
        });
        return;
      }

      // Registra al usuario en Firebase con el nombre, apellido y la asistencia
      const docRef = await addDoc(collection(db, 'usuarios'), {
        name: name,
        apellido: apellido,
        asistira: asistira,
      });
      console.log('Usuario registrado con ID:', docRef.id);

      // Limpiar los campos después de la validación
      setName('');
      setApellido('');
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
    // Verificar si se ha ingresado un nombre, apellido y se ha seleccionado una opción antes de validar
    if (name && apellido && asistira !== null) {
      // Lógica para validar
      handleRegistro();
    } else {
      // Mostrar SweetAlert indicando que se deben completar los campos
      Swal.fire({
        icon: 'warning',
        title: 'Por favor, complete los campos',
        text: 'Ingrese su nombre, apellido y seleccione una opción de confirmación.',
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
    <div className='confirmar-container'>
      <h2>Confirmacion</h2>
      <input
        className='input'
        type="text"
        placeholder="Ingresa tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='input'
        type="text"
        placeholder="Ingresa tu apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <div className='confirmar-btns'>
        <button className={`form-btn yes ${asistira === true ? 'active' : ''}`} onClick={() => handleAsistencia(true)}>
          Si asistiré
        </button>
        <button className={`form-btn no ${asistira === false ? 'active' : ''}`} onClick={() => handleAsistencia(false)}>
          No asistiré
        </button>
        <button className="validar-btn2" onClick={handleValidar}>
          Validar
        </button>
        <button className="compartir-whatsapp-btn" onClick={handleCompartirWhatsApp}>
          <FaSquareWhatsapp className='wpp-ico' />
        </button>
      </div>
    </div>
  );
};

export default Asistir;
