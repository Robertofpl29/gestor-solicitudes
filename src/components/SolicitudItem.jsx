function SolicitudItem({ solicitud }) {
  return (
    <li className="item">
      <strong>{solicitud.titulo}</strong>
      <span>Estado: {solicitud.estado}</span>
      <span>Prioridad: {solicitud.prioridad}</span>
    </li>
  );
}

export default SolicitudItem;