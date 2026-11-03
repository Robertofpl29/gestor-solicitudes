import { Link } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";
import Filtro from "../components/Filtro";
import SolicitudList from "../components/SolicitudList";

export default function ListadoSolicitudes() {
  // ── Consumo del estado global ──────────────────────────────────────────
  const {
    solicitudesFiltradas,
    solicitudes,
    cargando,
    error,
    recargar,
    permisos,
    usuario,
  } = useSolicitudes();

  const alcance =
    usuario?.rol === "estudiante"
      ? "Mis solicitudes"
      : usuario
        ? "Bandeja de Solicitudes"
        : "Bandeja de Solicitudes (vista previa)";

  return (
    <section>
      <div className="pagina__cabecera">
        <div>
          <h1>{alcance}</h1>
          <p className="pagina__conteo">
            {solicitudesFiltradas.length} Solicitudes
            {solicitudesFiltradas.length !== solicitudes.length &&
              ` de ${solicitudes.length} en el estado global`}
          </p>
        </div>
        <div className="pagina__acciones">
          <button type="button" className="btn btn-neutra" onClick={() => recargar()}>
            Recargar
          </button>
          {permisos.crear && (
            <Link className="btn btn-acento" to="/nueva">
              Nueva Solicitud
            </Link>
          )}
        </div>
      </div>

      {error && <p className="alerta alerta--error">{error}</p>}
      {cargando && <p className="alerta alerta--info">Cargando solicitudes desde la fuente de datos…</p>}

      {/* El filtro y las tarjetas consumen el mismo Context. */}
      <Filtro />
      <SolicitudList />
    </section>
  );
}
