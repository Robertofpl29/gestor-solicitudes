import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#242424', color: '#fff', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <h3 style={{ margin: 0 }}>Gestor de Solicitudes</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/solicitudes" style={{ color: '#646cff', textDecoration: 'none' }}>Ver Solicitudes</Link>
        <Link to="/nueva" style={{ color: '#646cff', textDecoration: 'none' }}>Nueva Solicitud</Link>
      </div>
    </nav>
  );
}
