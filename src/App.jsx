import { useState, useEffect } from "react";
import { solicitudesIniciales } from "./data/solicitudes";
import SolicitudList from "./components/SolicitudList";
import SolicitudForm from "./components/SolicitudForm";
import Filtro from "./components/Filtro";
import "./App.css";

function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [cargando, setCargando] = useState(true);

  // useEffect 1: simula la carga de datos (luego se cambia por Axios en la sesión 11)
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
    <div className="app">
      <h1>Gestor de Solicitudes</h1>
      <SolicitudForm onAgregar={agregarSolicitud} />
      <Filtro filtro={filtro} onCambiar={setFiltro} />
      {cargando ? <p>Cargando...</p> : <SolicitudList solicitudes={filtradas} />}
    </div>
  );
}

export default App;