import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <section>
      <h1>404 · Ruta no encontrada</h1>
      <p className="vacio">La dirección solicitada no existe en esta SPA.</p>
      <Link className="btn btn-acento" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
