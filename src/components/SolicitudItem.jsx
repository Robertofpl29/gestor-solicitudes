import { useState } from "react";
import { Link } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";
import { ESTADOS_SOLICITUD, TIPOS_TRAMITE } from "../api/configApi";

const CLASE_ESTADO = {
  Pendiente: "estado--pendiente",
  "En Revisión": "estado--revision",
  Aprobada: "estado--aprobada",
  Rechazada: "estado--rechazada",
};

export default function SolicitudItem({ solicitud }) {
 
  const { cambiarEstadoSolicitud, editarSolicitud, eliminarSolicitud, permisos } =
    useSolicitudes();

  const [editando, setEditando] = useState(false);
  const [formulario, setFormulario] = useState({
    tipoTramite: solicitud.tipoTramite,
    descripcionDetalle: solicitud.descripcionDetalle ?? "",
    justificacion: solicitud.justificacion ?? "",
    estado: solicitud.estado,
  });
  const [mensaje, setMensaje] = useState(null);

  const id = solicitud.id ?? solicitud.codigoRadicado;

  const manejarCambioEstado = async (evento) => {
    const nuevoEstado = evento.target.value;
    if (nuevoEstado === solicitud.estado) return;
    await cambiarEstadoSolicitud(id, nuevoEstado);
  };

  const abrirEditor = () => {
    setFormulario({
      tipoTramite: solicitud.tipoTramite,
      descripcionDetalle: solicitud.descripcionDetalle ?? "",
      justificacion: solicitud.justificacion ?? "",
      estado: solicitud.estado,
    });
    setMensaje(null);
    setEditando(true);
  };

  const guardarEdicion = async (evento) => {
    evento.preventDefault();
    const resultado = await editarSolicitud(id, formulario);
    if (resultado.ok) {
      setEditando(false);
      setMensaje({ tipo: "ok", texto: "Solicitud actualizada en el estado global." });
    } else {
      setMensaje({ tipo: "error", texto: resultado.mensaje });
    }
  };

  const manejarEliminar = async () => {
    
    const confirmar = window.confirm(
      `¿Eliminar la solicitud ${solicitud.codigoRadicado}?`,
    );
    if (confirmar) await eliminarSolicitud(id);
  };

  return (
    <li className="tarjeta-solicitud">
      <div className="tarjeta-solicitud__campos">
        <div className="dato">
          <span className="dato__clave">Código de la solicitud</span>
          <span className="dato__valor dato__valor--codigo">{solicitud.codigoRadicado}</span>
        </div>

        <div className="dato">
          <span className="dato__clave">Trámite académico</span>
          <span className="dato__valor">{solicitud.tipoTramite}</span>
        </div>

        <div className="dato">
          <span className="dato__clave">Nombre del estudiante</span>
          <span className="dato__valor">{solicitud.estudiante?.nombre ?? "—"}</span>
        </div>

        <div className="dato">
          <span className="dato__clave">Código de estudiante</span>
          <span className="dato__valor dato__valor--codigo">
            {solicitud.estudiante?.codigo ?? "—"}
          </span>
        </div>

        <div className="dato">
          <span className="dato__clave">Fecha de radicación</span>
          <span className="dato__valor">{solicitud.fechaRadicacion}</span>
        </div>

        <div className="dato">
          <span className="dato__clave">Estado</span>
          <span className={`estado ${CLASE_ESTADO[solicitud.estado] ?? "estado--pendiente"}`}>
            {solicitud.estado}
          </span>
        </div>
      </div>

      <div className="tarjeta-solicitud__detalle">
        <span className="dato__clave">Detalle</span>
        <p>{solicitud.descripcionDetalle}</p>
      </div>

      {mensaje && <p className={`alerta alerta--${mensaje.tipo}`}>{mensaje.texto}</p>}

      {editando && (
        <form className="form" onSubmit={guardarEdicion}>
          <div className="form__fila">
            <div className="form__campo">
              <label className="form__etiqueta" htmlFor={`tipo-${id}`}>
                Tipo de trámite académico
              </label>
              <select
                id={`tipo-${id}`}
                value={formulario.tipoTramite}
                onChange={(e) =>
                  setFormulario((f) => ({ ...f, tipoTramite: e.target.value }))
                }
              >
                {TIPOS_TRAMITE.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form__campo">
              <label className="form__etiqueta" htmlFor={`estado-${id}`}>
                Estado
              </label>
              <select
                id={`estado-${id}`}
                value={formulario.estado}
                onChange={(e) => setFormulario((f) => ({ ...f, estado: e.target.value }))}
              >
                {ESTADOS_SOLICITUD.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__campo">
            <label className="form__etiqueta" htmlFor={`detalle-${id}`}>
              Asunto / detalle
            </label>
            <input
              id={`detalle-${id}`}
              type="text"
              value={formulario.descripcionDetalle}
              onChange={(e) =>
                setFormulario((f) => ({ ...f, descripcionDetalle: e.target.value }))
              }
            />
          </div>

          <div className="form__campo">
            <label className="form__etiqueta" htmlFor={`justificacion-${id}`}>
              Justificación del caso
            </label>
            <textarea
              id={`justificacion-${id}`}
              rows="3"
              value={formulario.justificacion}
              onChange={(e) =>
                setFormulario((f) => ({ ...f, justificacion: e.target.value }))
              }
            />
          </div>

          <div className="form__pie">
            
            <button type="button" className="btn btn-neutra" onClick={() => setEditando(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-acento">
              Guardar cambios
            </button>
          </div>
        </form>
      )}

      {!editando && (
        <div className="tarjeta-solicitud__acciones">
          {permisos.cambiarEstado ? (
            <div className="grupo-estado">
              <label htmlFor={`cambiar-estado-${id}`}>Cambiar estado</label>
              <select
                id={`cambiar-estado-${id}`}
                value={solicitud.estado}
                onChange={manejarCambioEstado}
              >
                {ESTADOS_SOLICITUD.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="form__ayuda">
              Solo el personal autorizado puede cambiar el estado.
            </span>
          )}

          <Link className="btn btn-acento" to={`/solicitudes/${id}`}>
            Ver más
          </Link>

          {permisos.editar && (
            <button type="button" className="btn btn-linea" onClick={abrirEditor}>
              Editar
            </button>
          )}

          {permisos.eliminar && (
            <button type="button" className="btn btn-peligro" onClick={manejarEliminar}>
              Eliminar
            </button>
          )}
        </div>
      )}
    </li>
  );
}
