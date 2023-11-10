import React, { useState } from 'react';

function AsistenciaForm({ onAsistenciaSubmit }) {
  const [asistira, setAsistira] = useState(null);

  const handleAsistenciaChange = (event) => {
    setAsistira(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAsistenciaSubmit(asistira);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ¿Asistirás?
        <select value={asistira} onChange={handleAsistenciaChange}>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </label>
      <button type="submit">Confirmar</button>
    </form>
  );
}

export default AsistenciaForm;
