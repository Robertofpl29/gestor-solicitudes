import { useState } from "react";

function SolicitudForm({ onAgregar }) {
  const [titulo, setTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("Media");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onAgregar({ titulo, prioridad });
    setTitulo("");
    setPrioridad("Media");
  };

  return (
    <form onSubmit={manejarEnvio} className="form">
      <input
        type="text"
        placeholder="Título de la solicitud"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}

export default SolicitudForm;