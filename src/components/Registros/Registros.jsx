import React, { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Registro.css";

const UsuariosRegistrados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchUsuarios = async () => {
    try {
      const usuariosCollection = collection(db, "usuarios");
      const usuariosSnapshot = await getDocs(usuariosCollection);

      const usuariosData = usuariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsuarios(usuariosData);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleActualizarLista = () => {
    setLoading(true);
    fetchUsuarios();
  };

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOcultarMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div>
      <button onClick={menuVisible ? handleOcultarMenu : handleToggleMenu}>
        {menuVisible ? "Ocultar Lista" : "Confirmaciones"}
      </button>
      
      <div className={`overlay ${menuVisible ? "menu-visible" : ""}`}>
        <div className={`lista ${menuVisible ? "menu-activo" : ""}`}>
          <h2>Confirmaciones</h2>
          {menuVisible && (
        <button onClick={handleOcultarMenu}>Ocultar Menú</button>
      )}
          <button onClick={handleActualizarLista}>Actualizar Lista</button>
          {loading ? (
            <p>Cargando...</p>
          ) : usuarios.length === 0 ? (
            <p>Nadie ha confirmado aún.</p>
          ) : (
            <ul className="ul">
              {usuarios.map((usuario) => (
                <li key={usuario.id}>
                  {usuario.name} -{" "}
                  {usuario.asistira === true
                    ? "Asistirá"
                    : usuario.asistira === false
                    ? "No Asistirá"
                    : "Quizás Asistirá"}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsuariosRegistrados;
