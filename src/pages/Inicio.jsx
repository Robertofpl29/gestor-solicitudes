import { useSelector } from "react-redux";
import EstadoGlobalPanel from "../components/EstadoGlobalPanel";
import PreferenciasRedux from "../components/PreferenciasRedux";

export default function Inicio() {
  // Consultar el estado de visibilidad desde Redux
  const mostrarEstadisticas = useSelector(
    (state) => state.preferencias.mostrarEstadisticas
  );

  return (
    <section className="pagina-inicio">
      <header className="inicio-encabezado">
        <h1>Gestor de Solicitudes Académicas</h1>
        <p>Bienvenido al sistema de Gestor de Solicitudes académicas</p>
      </header>

      {/* Mostrar u ocultar estadísticas según Redux */}
      {mostrarEstadisticas && <EstadoGlobalPanel />}

      <PreferenciasRedux />
    </section>
  );
}