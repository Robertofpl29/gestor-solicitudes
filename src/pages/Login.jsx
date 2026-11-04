import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";

export default function Login() {
  // ── Consumo del estado global ──────────────────────────────────────────
  const { iniciarSesion, usuario, modoDatos, alternarModoDatos } = useSolicitudes();
  const navegar = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setMensaje(null);
    setEnviando(true);

    const resultado = await iniciarSesion(correo.trim(), password);
    setEnviando(false);

    if (resultado.ok) {
      navegar("/solicitudes");
    } else {
      setMensaje({ tipo: "error", texto: resultado.mensaje });
    }
  };

  return (
    <section>
      <div className="pagina__cabecera">
        <div>
          <h1>Iniciar sesión</h1>
        </div>
      </div>

      {usuario ? (
        <div className="detalle">
          <div className="detalle__fila">
            <span className="detalle__clave">Usuario</span>
            <span className="detalle__valor">{usuario.nombre}</span>
          </div>
          <div className="detalle__fila">
            <span className="detalle__clave">Correo</span>
            <span className="detalle__valor">{usuario.correo}</span>
          </div>
          <div className="detalle__fila">
            <span className="detalle__clave">Rol</span>
            <span className="detalle__valor">{usuario.rol}</span>
          </div>
          <div className="detalle__fila">
            <span className="detalle__clave">Alcance de las solicitudes</span>
            <span className="detalle__valor">
              {usuario.rol === "estudiante"
                ? "Solo las solicitudes que usted radicó."
                : "Todas las solicitudes registradas en la plataforma."}
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={manejarEnvio} className="form">
          {mensaje && <p className={`alerta alerta--${mensaje.tipo}`}>{mensaje.texto}</p>}

          <div className="form__campo">
            <label className="form__etiqueta" htmlFor="correo">
              Correo institucional <span className="form__requerido">*</span>
            </label>
            <input
              id="correo"
              type="email"
              placeholder="usuario@isil.pe"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form__campo">
            <label className="form__etiqueta" htmlFor="password">
              Contraseña <span className="form__requerido">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form__pie">
            <p className="form__nota">
              Como <strong>administrador</strong> o <strong>personal</strong> se muestran todas las
              solicitudes; como <strong>estudiante</strong>, solo las suyas.
            </p>
            <button type="submit" className="btn btn-acento" disabled={enviando}>
              {enviando ? "Verificando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      )}

      {/* El modo solo se cambia sin sesión: con sesión, la recarga dejaría datos parciales. */}
      {!usuario && (
        <div className="detalle" style={{ marginTop: "1rem" }}>
          <div className="detalle__fila">
            <span className="detalle__clave">Origen de los datos</span>
            <span className="detalle__valor">
              {modoDatos === "api" ? "API REST (PA2)" : "datos locales (modo demo)"}
            </span>
          </div>
          <div className="detalle__fila">
            <span className="detalle__clave">Acción</span>
            <span className="detalle__valor">
              <button type="button" className="btn btn-neutra" onClick={alternarModoDatos}>
                Cambiar a {modoDatos === "api" ? "modo demo (local)" : "modo API"}
              </button>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
