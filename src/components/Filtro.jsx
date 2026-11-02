function Filtro({ filtro, onCambiar }) {
  return (
    <select value={filtro} onChange={(e) => onCambiar(e.target.value)}>
      <option value="Todas">Todas</option>
      <option value="Pendiente">Pendiente</option>
      <option value="En proceso">En proceso</option>
      <option value="Resuelta">Resuelta</option>
    </select>
  );
}

export default Filtro;