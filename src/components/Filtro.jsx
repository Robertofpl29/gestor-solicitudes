import { useSolicitudes } from "../context/useSolicitudes";
import { OPCIONES_FILTRO } from "../api/configApi";

export default function Filtro() {
  // ── Consumo del estado global ──────────────────────────────────────────
  // El filtro vive en el Context, por eso se mantiene al cambiar de vista.
  const {
    filtroEstado,
    busqueda,
    hayFiltrosActivos,
    establecerFiltroEstado,
    establecerBusqueda,
    limpiarFiltros,
  } = useSolicitudes();

  return (
    <div className="filtro">
      <div className="filtro__campo">
        <label htmlFor="filtro-estado">Estado</label>
        <select
          id="filtro-estado"
          value={filtroEstado}
          onChange={(e) => establecerFiltroEstado(e.target.value)}
        >
          {OPCIONES_FILTRO.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro__campo filtro__campo--ancho">
        <label htmlFor="filtro-busqueda">Buscar</label>
        <input
          id="filtro-busqueda"
          type="search"
          placeholder="Código, trámite, estudiante..."
          value={busqueda}
          onChange={(e) => establecerBusqueda(e.target.value)}
        />
      </div>

      {hayFiltrosActivos && (
        <button type="button" className="btn btn-neutra" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
