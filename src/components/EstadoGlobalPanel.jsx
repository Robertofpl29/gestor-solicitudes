import { useSolicitudes } from "../context/useSolicitudes";

export default function EstadoGlobalPanel() {
  // ── Consumo del estado global ──────────────────────────────────────────
  const { solicitudes, metricas } = useSolicitudes();

  return (
    <aside className="panel-estado">
      <h4>Estado de Solicitudes Academicas :</h4>

      <div className="panel-estado__contadores">
        <div className="contador">
          <span className="contador__clave">Solicitudes realizadas</span>
          <strong className="contador__valor">{solicitudes.length}</strong>
        </div>
        <div className="contador">
          <span className="contador__clave">Pendientes</span>
          <strong className="contador__valor">{metricas.pendientes}</strong>
        </div>
        <div className="contador">
          <span className="contador__clave">Aprobadas</span>
          <strong className="contador__valor">{metricas.aprobadas}</strong>
        </div>
      </div>
    </aside>
  );
}