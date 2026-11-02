import SolicitudItem from "./SolicitudItem";

function SolicitudList({ solicitudes }) {
  if (solicitudes.length === 0) {
    return <p>No hay solicitudes para mostrar.</p>;
  }

  return (
    <ul className="lista">
      {solicitudes.map((s) => (
        <SolicitudItem key={s.id} solicitud={s} />
      ))}
    </ul>
  );
}

export default SolicitudList;