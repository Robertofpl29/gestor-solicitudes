import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { solicitudesIniciales } from "./data/solicitudes";
import Navbar from "./components/Navbar";
import SolicitudList from "./components/SolicitudList";
import SolicitudForm from "./components/SolicitudForm";
import Filtro from "./components/Filtro";
import "./App.css";

function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [cargando, setCargando] = useState(true);

  // useEffect 1: simula la carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setSolicitudes(solicitudesIniciales);
      setCargando(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // useEffect 2: reacciona a cambios de estado
  useEffect(() => {
    document.title = `Solicitudes (${solicitudes.length})`;
  }, [solicitudes]);

  const agregarSolicitud = ({ titulo, prioridad }) => {
    const nueva = { id: Date.now(), titulo, prioridad, estado: "Pendiente" };
    setSolicitudes([...solicitudes, nueva]);
  };

  const filtradas =
    filtro === "Todas"
      ? solicitudes
      : solicitudes.filter((s) => s.estado === filtro);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main style={{ padding: "2rem" }}>
          <Routes>
            {/* Vista Principal / Inicio */}
            <Route
              path="/"
              element={
                <div>
                  <h1>Gestor de Solicitudes Académicas</h1>
                  <p>Bienvenido al sistema SPA con React Router.</p>
                </div>
              }
            />

            {/* Vista de Listado y Filtrado (Actividad 1 y 2 unificadas) */}
            <Route
              path="/solicitudes"
              element={
                <div>
                  <h1>Listado de Solicitudes</h1>
                  <Filtro filtro={filtro} onCambiar={setFiltro} />
                  {cargando ? (
                    <p>Cargando...</p>
                  ) : (
                    <SolicitudList solicitudes={filtradas} />
                  )}
                </div>
              }
            />

            {/* Vista para Registrar Nueva Solicitud */}
            <Route
              path="/nueva"
              element={
                <div>
                  <h1>Registrar Nueva Solicitud</h1>
                  <SolicitudForm onAgregar={agregarSolicitud} />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
