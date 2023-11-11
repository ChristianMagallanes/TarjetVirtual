// Login.js

import React, { useState } from 'react';
import { authenticateAdmin } from './AuthService';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Autenticar como admin
      const user = await authenticateAdmin(email, password);

      // Llamar a la función de devolución de llamada proporcionada
      onLogin(user);
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error('Error de inicio de sesión:', error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
