import { useSolicitudes } from "../context/useSolicitudes";
import SolicitudItem from "./SolicitudItem";

export default function SolicitudList() {
  
  const { solicitudesFiltradas, cargando, hayFiltrosActivos } = useSolicitudes();

  if (cargando) {
    return <p className="vacio">Cargando solicitudes…</p>;
  }

  if (solicitudesFiltradas.length === 0) {
    return (
      <p className="vacio">
        {hayFiltrosActivos
          ? "No hay solicitudes que coincidan con los filtros aplicados."
          : "No hay solicitudes para mostrar."}
      </p>
    );
  }

  return (
    <ul className="lista">
      {solicitudesFiltradas.map((solicitud) => (
        <SolicitudItem key={solicitud.id ?? solicitud.codigoRadicado} solicitud={solicitud} />
      ))}
    </ul>
  );
}