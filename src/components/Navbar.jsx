import { Link, NavLink } from "react-router-dom";

import { useSolicitudes } from "../context/useSolicitudes";

export default function Navbar() {
  
  const { usuario, cerrarSesion } = useSolicitudes();

  return (
    <header className="navbar">
      <div className="navbar__marca">
        <Link className="navbar__titulo" to="/">
          Portal de Solicitudes Académicas
        </Link>
      </div>

      
      <nav className="navbar__menu">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/solicitudes">Solicitudes</NavLink>
        <NavLink to="/nueva">Nueva Solicitud</NavLink>
      </nav>

      
      <div className="navbar__sesion">
        {usuario ? (
          <>
            <div className="navbar__usuario">
              <strong>{usuario.nombre}</strong>
              <span>{usuario.rol}</span>
            </div>
            <button type="button" className="btn btn-linea-oscura" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link className="btn btn-linea-oscura" to="/login">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

