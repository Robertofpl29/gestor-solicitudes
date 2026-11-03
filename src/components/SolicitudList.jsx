
import { useSelector } from "react-redux";
import { useSolicitudes } from "../context/useSolicitudes";
import SolicitudItem from "./SolicitudItem";

export default function SolicitudList() {
  const { solicitudesFiltradas, cargando, hayFiltrosActivos } =
    useSolicitudes();

  // Leer la preferencia de visualización desde Redux
  const vista = useSelector((state) => state.preferencias.vista);

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
    <ul className={vista === "tarjetas" ? "lista lista--tarjetas" : "lista"}>
      {solicitudesFiltradas.map((solicitud) => (
        <SolicitudItem
          key={solicitud.id ?? solicitud.codigoRadicado}
          solicitud={solicitud}
        />
      ))}
    </ul>
  );
}
