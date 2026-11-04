import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";
import { ESTADOS_SOLICITUD } from "../api/configApi";

const CLASE_ESTADO = {
  Pendiente: "estado--pendiente",
  "En Revisión": "estado--revision",
  Aprobada: "estado--aprobada",
  Rechazada: "estado--rechazada",
};

export default function DetalleSolicitud() {
  const { id } = useParams();
  const navegar = useNavigate();

  // ── Consumo del estado global ──────────────────────────────────────────
  // La vista no hace su propia petición: busca la solicitud en el Context.
  const { solicitudes, cargando, cambiarEstadoSolicitud, eliminarSolicitud, permisos } =
    useSolicitudes();

  const [mensaje, setMensaje] = useState(null);

  const solicitud = solicitudes.find(
    (s) => String(s.id) === String(id) || String(s.codigoRadicado) === String(id),
  );

  if (cargando) return <p className="vacio">Cargando solicitud…</p>;

  if (!solicitud) {
    return (
      <section>
        <h1>Solicitud no encontrada</h1>
        <p className="vacio">
          El radicado <code>{id}</code> no está en el estado global.
        </p>
        <Link className="btn btn-acento" to="/solicitudes">
          Volver al listado
        </Link>
      </section>
    );
  }

  const manejarEstado = async (evento) => {
    const resultado = await cambiarEstadoSolicitud(
      solicitud.id ?? solicitud.codigoRadicado,
      evento.target.value,
    );
    setMensaje(
      resultado.ok
        ? { tipo: "ok", texto: "Estado actualizado en el estado global." }
        : { tipo: "error", texto: resultado.mensaje },
    );
  };

  const manejarEliminar = async () => {
    if (!window.confirm(`¿Eliminar ${solicitud.codigoRadicado}?`)) return;
    const resultado = await eliminarSolicitud(solicitud.id ?? solicitud.codigoRadicado);
    if (resultado.ok) navegar("/solicitudes");
  };

  return (
    <section>
      <div className="pagina__cabecera">
        <div>
          <h1>{solicitud.tipoTramite}</h1>
          <p className="pagina__conteo">Código de la solicitud: {solicitud.codigoRadicado}</p>
        </div>
        <Link className="btn btn-neutra" to="/solicitudes">
          Volver al listado
        </Link>
      </div>

      {mensaje && <p className={`alerta alerta--${mensaje.tipo}`}>{mensaje.texto}</p>}

      <div className="detalle">
        <div className="detalle__fila">
          <span className="detalle__clave">Código de la solicitud</span>
          <span className="detalle__valor dato__valor--codigo">{solicitud.codigoRadicado}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Trámite académico</span>
          <span className="detalle__valor">{solicitud.tipoTramite}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Nombre del estudiante</span>
          <span className="detalle__valor">{solicitud.estudiante?.nombre ?? "—"}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Código de estudiante</span>
          <span className="detalle__valor dato__valor--codigo">
            {solicitud.estudiante?.codigo ?? "—"}
          </span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Carrera</span>
          <span className="detalle__valor">{solicitud.estudiante?.carrera ?? "—"}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Correo institucional</span>
          <span className="detalle__valor">{solicitud.estudiante?.email ?? "—"}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Fecha de radicación</span>
          <span className="detalle__valor">{solicitud.fechaRadicacion}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Estado</span>
          <span className="detalle__valor">
            {permisos.cambiarEstado ? (
              <select value={solicitud.estado} onChange={manejarEstado}>
                {ESTADOS_SOLICITUD.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            ) : (
              <span className={`estado ${CLASE_ESTADO[solicitud.estado] ?? "estado--pendiente"}`}>
                {solicitud.estado}
              </span>
            )}
          </span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Detalle</span>
          <span className="detalle__valor">{solicitud.descripcionDetalle}</span>
        </div>

        <div className="detalle__fila">
          <span className="detalle__clave">Justificación del caso</span>
          <span className="detalle__valor">{solicitud.justificacion}</span>
        </div>
      </div>

      {permisos.eliminar && (
        <div className="pagina__acciones" style={{ marginTop: "1rem" }}>
          <button type="button" className="btn btn-peligro" onClick={manejarEliminar}>
            Eliminar solicitud
          </button>
        </div>
      )}
    </section>
  );
}
