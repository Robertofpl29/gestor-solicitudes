
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarVista,
  alternarEstadisticas,
} from "../store/preferenciasSlice";

function PreferenciasRedux() {
  // Leer el estado global de Redux
  const { vista, mostrarEstadisticas } = useSelector(
    (state) => state.preferencias
  );

  // Permitir enviar acciones a Redux
  const dispatch = useDispatch();

  return (
    <section className="preferencias-redux">
      <h2>Preferencias de visualización (Redux)</h2>

      <div>
        <p>Tipo de visualización: <strong>{vista}</strong></p>

        <button onClick={() => dispatch(cambiarVista("lista"))}>
          Vista Lista
        </button>

        <button onClick={() => dispatch(cambiarVista("tarjetas"))}>
          Vista Tarjetas
        </button>
      </div>

      <div>
        <p>
          Estadísticas:{" "}
          <strong>{mostrarEstadisticas ? "Visibles" : "Ocultas"}</strong>
        </p>

        <button onClick={() => dispatch(alternarEstadisticas())}>
          {mostrarEstadisticas ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>
      </div>
    </section>
  );
}

export default PreferenciasRedux;
