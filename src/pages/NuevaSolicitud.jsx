import { useNavigate } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";
import SolicitudForm from "../components/SolicitudForm";

export default function NuevaSolicitud() {
  const { modoDatos, usuario } = useSolicitudes();
  const navegar = useNavigate();

  return (
    <section>
      <div className="pagina__cabecera">
        <div>
          <h1>Nueva Solicitud</h1>
        </div>
        <button type="button" className="btn btn-neutra" onClick={() => navegar(-1)}>
          Volver
        </button>
      </div>

      {modoDatos === "local" && usuario && (
        <p className="alerta alerta--info">
          Modo demo: la solicitud se guarda en el estado global de la aplicación (datos locales).
        </p>
      )}

      <SolicitudForm />
    </section>
  );
}
