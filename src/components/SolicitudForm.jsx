import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";
import { TIPOS_TRAMITE } from "../api/configApi";

const LIMITE_JUSTIFICACION = 500;

export default function SolicitudForm() {
  // ── Consumo del estado global ──────────────────────────────────────────
  const { agregarSolicitud, estudiantes, miEstudiante, permisos, modoDatos } = useSolicitudes();
  const navegar = useNavigate();

  // Los campos del formulario son estado local: solo los usa este componente.
  const [tipoTramite, setTipoTramite] = useState("");
  const [asunto, setAsunto] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Si inició sesión un estudiante, su código viene del Context y no se edita.
  const esEstudianteAutenticado = Boolean(miEstudiante);
  const codigoEstudiante = esEstudianteAutenticado ? (miEstudiante?.codigo ?? "") : codigoIngresado;

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setMensaje(null);

    if (!tipoTramite) {
      setMensaje({ tipo: "error", texto: "Seleccione el tipo de trámite académico." });
      return;
    }
    if (!asunto.trim()) {
      setMensaje({ tipo: "error", texto: "El asunto es obligatorio." });
      return;
    }
    if (!codigoEstudiante.trim()) {
      setMensaje({ tipo: "error", texto: "El código de estudiante es obligatorio." });
      return;
    }
    // En modo local el estudiante debe existir en los datos simulados.
    const codigo = codigoEstudiante.trim().toUpperCase();
    if (modoDatos === "local" && !estudiantes.some((e) => e.codigo === codigo)) {
      setMensaje({ tipo: "error", texto: `El código ${codigo} no corresponde a un estudiante registrado.` });
      return;
    }
    if (justificacion.trim().length < 5) {
      setMensaje({ tipo: "error", texto: "La justificación debe tener al menos 5 caracteres." });
      return;
    }

    setEnviando(true);
    const resultado = await agregarSolicitud({
      tipoTramite,
      descripcionDetalle: asunto,
      estudianteCodigo: codigoEstudiante,
      justificacion,
    });
    setEnviando(false);

    if (resultado.ok) {
      navegar("/solicitudes");
    } else {
      setMensaje({ tipo: "error", texto: resultado.mensaje });
    }
  };

  if (!permisos.crear) {
    return (
      <p className="alerta alerta--info">
        Debe <strong>iniciar sesión</strong> para radicar una solicitud.
      </p>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className="form">
      {mensaje && <p className={`alerta alerta--${mensaje.tipo}`}>{mensaje.texto}</p>}

      <div className="form__fila">
        <div className="form__campo">
          <label className="form__etiqueta" htmlFor="tipo-tramite">
            Tipo de trámite académico <span className="form__requerido">*</span>
          </label>
          <select
            id="tipo-tramite"
            value={tipoTramite}
            onChange={(e) => setTipoTramite(e.target.value)}
            required
          >
            <option value="">Seleccione el tipo de trámite curricular...</option>
            {TIPOS_TRAMITE.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="form__campo">
          <label className="form__etiqueta" htmlFor="codigo-estudiante">
            Código de estudiante <span className="form__requerido">*</span>
          </label>
          <input
            id="codigo-estudiante"
            type="text"
            placeholder="Ej: ISIL-742910"
            value={codigoEstudiante}
            onChange={(e) => setCodigoIngresado(e.target.value)}
            disabled={esEstudianteAutenticado}
            required
          />
          {modoDatos === "local" && !esEstudianteAutenticado && (
            <span className="form__ayuda">
              Códigos registrados: {estudiantes.map((e) => e.codigo).join(", ")}
            </span>
          )}
        </div>
      </div>

      <div className="form__campo">
        <label className="form__etiqueta" htmlFor="asunto">
          Asunto <span className="form__requerido">*</span>
        </label>
        <input
          id="asunto"
          type="text"
          placeholder="Ej: Retiro del curso x"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          required
        />
      </div>

      <div className="form__campo">
        <label className="form__etiqueta" htmlFor="justificacion">
          Justificación del caso <span className="form__requerido">*</span>
        </label>
        <textarea
          id="justificacion"
          rows="5"
          maxLength={LIMITE_JUSTIFICACION}
          placeholder="Describa con claridad los motivos de su solicitud"
          value={justificacion}
          onChange={(e) => setJustificacion(e.target.value)}
          required
        />
        <span className="form__contador">
          {justificacion.length} / {LIMITE_JUSTIFICACION} caracteres
        </span>
      </div>

      <div className="form__pie">
        <button type="button" className="btn btn-neutra" onClick={() => navegar(-1)}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-acento" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar Solicitud"}
        </button>
      </div>
    </form>
  );
}
