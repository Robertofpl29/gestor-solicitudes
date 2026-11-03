
import { useSelector } from "react-redux";
import EstadoGlobalPanel from "../components/EstadoGlobalPanel";
import PreferenciasRedux from "../components/PreferenciasRedux";

export default function Inicio() {
  // Consultar el estado de visibilidad desde Redux
  const mostrarEstadisticas = useSelector(
    (state) => state.preferencias.mostrarEstadisticas
  );

  return (
    <section>
      <h1>Gestor de Solicitudes Académicas</h1>
      <p>Bienvenido al sistema de Gestor de Solicitudes académicas</p>

      {/* Mostrar u ocultar estadísticas según Redux */}
      {mostrarEstadisticas && <EstadoGlobalPanel />}

      <PreferenciasRedux />
    </section>
  );
}
