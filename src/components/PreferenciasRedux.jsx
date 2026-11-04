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
    <section className="preferencias">
      <h2>Preferencias de visualización (Redux)</h2>

      <div className="preferencias__grupo">
        <p>Tipo de visualización: <strong>{vista}</strong></p>

        <div className="preferencias__botones">
          <button
            className={`btn ${vista === "lista" ? "btn-acento" : "btn-neutra"}`}
            onClick={() => dispatch(cambiarVista("lista"))}
          >
            Vista Lista
          </button>

          <button
            className={`btn ${vista === "tarjetas" ? "btn-acento" : "btn-neutra"}`}
            onClick={() => dispatch(cambiarVista("tarjetas"))}
          >
            Vista Tarjetas
          </button>
        </div>
      </div>

      <div className="preferencias__grupo">
        <p>
          Estadísticas:{" "}
          <strong>{mostrarEstadisticas ? "Visibles" : "Ocultas"}</strong>
        </p>

        <div className="preferencias__botones">
          <button
            className="btn btn-linea"
            onClick={() => dispatch(alternarEstadisticas())}
          >
            {mostrarEstadisticas ? "Ocultar estadísticas" : "Mostrar estadísticas"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PreferenciasRedux;