import { Route, Routes } from "react-router-dom";

import { SolicitudesProvider } from "./context/SolicitudesContext";
import Navbar from "./components/Navbar";

import Inicio from "./pages/Inicio";
import ListadoSolicitudes from "./pages/ListadoSolicitudes";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import DetalleSolicitud from "./pages/DetalleSolicitud";
import Login from "./pages/Login";
import NoEncontrada from "./pages/NoEncontrada";

import "./App.css";

function App() {
  return (
    
    <SolicitudesProvider>
      <div className="app">
        <Navbar />

        <main className="contenido">
          <Routes>
           
            <Route path="/" element={<Inicio />} />
            <Route path="/solicitudes" element={<ListadoSolicitudes />} />
            <Route path="/solicitudes/:id" element={<DetalleSolicitud />} />
            <Route path="/nueva" element={<NuevaSolicitud />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </main>

        <footer className="pie">
          © 2026 Sistema de Gestión de Solicitudes Académicas
        </footer>
      </div>
    </SolicitudesProvider>
  );
}

export default App;
