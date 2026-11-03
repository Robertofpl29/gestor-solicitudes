
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { ESTADOS_SOLICITUD, TOKEN_KEY, USUARIO_KEY } from "../api/configApi";
import { iniciarSesion as iniciarSesionApi } from "../api/authApi";
import {
  actualizarEstadoSolicitud,
  crearSolicitud,
  eliminarSolicitud as eliminarSolicitudApi,
  listarEstudiantes,
  listarMisSolicitudes,
  listarSolicitudes,
} from "../api/solicitudesApi";
import {
  buscarEstudianteLocal,
  estudiantesLocales,
  solicitudesLocales,
} from "../data/solicitudes";

export const SolicitudesContext = createContext(null);

export function SolicitudesProvider({ children }) {
  
  const [solicitudes, setSolicitudes] = useState([]);
  const [estudiantes, setEstudiantes] = useState(estudiantesLocales);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [modoDatos, setModoDatos] = useState("api");
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem(USUARIO_KEY);
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });
  const [miEstudiante, setMiEstudiante] = useState(null);

  const rol = usuario?.rol ?? null;
  const esAdministrador = rol === "administrador";
  const esPersonalInterno = rol === "administrador" || rol === "personal";
  const demoSinSesion = !usuario && modoDatos === "local";

  const permisos = useMemo(
    () => ({
      verTodasLasSolicitudes: esPersonalInterno || demoSinSesion,
      cambiarEstado: esPersonalInterno || demoSinSesion,
      editar: esPersonalInterno || demoSinSesion,
      eliminar: esAdministrador || demoSinSesion,
      crear: Boolean(usuario) || demoSinSesion,
    }),
    [esPersonalInterno, esAdministrador, demoSinSesion, usuario],
  );

  const cargarSolicitudes = useCallback(
    async (modo = "api", tokenActivo = "", rolActivo = null, correoActivo = "") => {
      setCargando(true);
      setError(null);

      if (modo === "local") {
      
        const soloMias = rolActivo === "estudiante";
        const propio = buscarEstudianteLocal({ correo: correoActivo });
        const lista = soloMias
          ? solicitudesLocales.filter((s) => s.estudiante?.codigo === propio?.codigo)
          : solicitudesLocales;

        setSolicitudes(lista);
        setEstudiantes(estudiantesLocales);
        setMiEstudiante(soloMias ? propio : null);
        setModoDatos("local");
        setCargando(false);
        return;
      }

      try {
        const esEstudiante = rolActivo === "estudiante";
        const datos = esEstudiante
          ? await listarMisSolicitudes(tokenActivo || undefined)
          : await listarSolicitudes({ token: tokenActivo || undefined });

        const lista = Array.isArray(datos) ? datos : [];
        setSolicitudes(lista);
        setModoDatos("api");

        
        if (esEstudiante) {
          setMiEstudiante(lista[0]?.estudiante ?? null);
        }
      } catch (fallo) {
        
        const soloMias = rolActivo === "estudiante";
        const propio = buscarEstudianteLocal({ correo: correoActivo });
        const lista = soloMias
          ? solicitudesLocales.filter((s) => s.estudiante?.codigo === propio?.codigo)
          : solicitudesLocales;

        setSolicitudes(lista);
        setEstudiantes(estudiantesLocales);
        setMiEstudiante(soloMias ? propio : null);
        setModoDatos("local");
        setError(
          `${fallo.message} Se activó el modo demo con datos locales simulados para no bloquear la demostración.`,
        );
      } finally {
        setCargando(false);
      }
    },
    [],
  );

  
  const cargarEstudiantes = useCallback(
    async (tokenActivo = "", rolActivo = null, correoActivo = "") => {
      
      if (rolActivo === "estudiante") {
        const propio = buscarEstudianteLocal({ correo: correoActivo });
        if (propio) setMiEstudiante((previo) => previo ?? propio);
        setEstudiantes(estudiantesLocales);
        return;
      }

      if (!tokenActivo) {
        setEstudiantes(estudiantesLocales);
        return;
      }

      try {
        const datos = await listarEstudiantes(tokenActivo);
        if (Array.isArray(datos) && datos.length > 0) setEstudiantes(datos);
      } catch {
        
        setEstudiantes(estudiantesLocales);
      }
    },
    [],
  );

  
  const agregarSolicitud = useCallback(
    async (datos) => {
      const limpio = {
        tipoTramite: datos.tipoTramite,
        descripcionDetalle: datos.descripcionDetalle,
        estudianteCodigo: String(datos.estudianteCodigo || "").trim().toUpperCase(),
        justificacion: datos.justificacion,
        aceptaTerminos: true,
      };

      if (modoDatos === "api" && token) {
        try {
          const creada = await crearSolicitud(limpio, token);
          setSolicitudes((previas) => [creada, ...previas]);
          return { ok: true, solicitud: creada };
        } catch (fallo) {
          return { ok: false, mensaje: fallo.message };
        }
      }

      
      const estudiante =
        estudiantes.find((e) => e.codigo === limpio.estudianteCodigo) ??
        (miEstudiante?.codigo === limpio.estudianteCodigo ? miEstudiante : null);
      const correlativo = String(
        solicitudesLocales.length + solicitudes.length + 1,
      ).padStart(3, "0");
      const nueva = {
        id: `local-${Date.now()}`,
        codigoRadicado: `SOL-${new Date().getFullYear()}-${correlativo}`,
        tipoTramite: limpio.tipoTramite,
        descripcionDetalle: limpio.descripcionDetalle || "Trámite en gestión académica",
        fechaRadicacion: new Date().toLocaleDateString("es-PE"),
        estado: "Pendiente",
        justificacion: limpio.justificacion,
        estudiante,
        createdAt: new Date().toISOString(),
      };
      setSolicitudes((previas) => [nueva, ...previas]);
      return { ok: true, solicitud: nueva };
    },
    [modoDatos, token, estudiantes, solicitudes.length, miEstudiante],
  );

  
  const cambiarEstadoSolicitud = useCallback(
    async (id, estado) => {
      if (!ESTADOS_SOLICITUD.includes(estado)) {
        return { ok: false, mensaje: `Estado no válido: ${estado}` };
      }

      if (modoDatos === "api" && token) {
        try {
          const actualizada = await actualizarEstadoSolicitud(id, estado, token);
          setSolicitudes((previas) =>
            previas.map((s) =>
              s.id === id || s.codigoRadicado === id ? { ...s, ...actualizada } : s,
            ),
          );
          return { ok: true, solicitud: actualizada };
        } catch (fallo) {
          return { ok: false, mensaje: fallo.message };
        }
      }

      setSolicitudes((previas) =>
        previas.map((s) => (s.id === id || s.codigoRadicado === id ? { ...s, estado } : s)),
      );
      return { ok: true };
    },
    [modoDatos, token],
  );

  
  const editarSolicitud = useCallback(
    async (id, cambios) => {
      const actual = solicitudes.find((s) => s.id === id || s.codigoRadicado === id);
      if (!actual) return { ok: false, mensaje: "La solicitud no existe en el estado global." };

      if (cambios.estado && cambios.estado !== actual.estado) {
        const resultado = await cambiarEstadoSolicitud(id, cambios.estado);
        if (!resultado.ok) return resultado;
      }

      setSolicitudes((previas) =>
        previas.map((s) =>
          s.id === id || s.codigoRadicado === id ? { ...s, ...cambios } : s,
        ),
      );
      return { ok: true };
    },
    [solicitudes, cambiarEstadoSolicitud],
  );

  
  const eliminarSolicitud = useCallback(
    async (id) => {
      if (modoDatos === "api" && token) {
        try {
          await eliminarSolicitudApi(id, token);
          setSolicitudes((previas) =>
            previas.filter((s) => s.id !== id && s.codigoRadicado !== id),
          );
          return { ok: true };
        } catch (fallo) {
          return { ok: false, mensaje: fallo.message };
        }
      }

      setSolicitudes((previas) => previas.filter((s) => s.id !== id && s.codigoRadicado !== id));
      return { ok: true };
    },
    [modoDatos, token],
  );

  
  const establecerFiltroEstado = useCallback((estado) => {
    setFiltroEstado(estado);
  }, []);

  const establecerBusqueda = useCallback((texto) => {
    setBusqueda(texto);
  }, []);

  const limpiarFiltros = useCallback(() => {
    setFiltroEstado("Todos");
    setBusqueda("");
  }, []);

  
  const iniciarSesion = useCallback(
    async (correo, password) => {
      try {
        const respuesta = await iniciarSesionApi(correo, password);
        localStorage.setItem(TOKEN_KEY, respuesta.token);
        localStorage.setItem(USUARIO_KEY, JSON.stringify(respuesta.usuario));
        setToken(respuesta.token);
        setUsuario(respuesta.usuario);
        setMiEstudiante(null);

       
        await cargarSolicitudes("api", respuesta.token, respuesta.usuario.rol, respuesta.usuario.correo);
        await cargarEstudiantes(respuesta.token, respuesta.usuario.rol, respuesta.usuario.correo);

        return { ok: true, usuario: respuesta.usuario };
      } catch (fallo) {
        return { ok: false, mensaje: fallo.message };
      }
    },
    [cargarSolicitudes, cargarEstudiantes],
  );

  
  const restablecerDatosLocales = useCallback(() => {
    setModoDatos("local");
    setSolicitudes(solicitudesLocales);
    setEstudiantes(estudiantesLocales);
  }, []);

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    setToken("");
    setUsuario(null);
    setMiEstudiante(null);
    restablecerDatosLocales();
  }, [restablecerDatosLocales]);

 
  const recargar = useCallback(async () => {
    await cargarSolicitudes(modoDatos, token, rol, usuario?.correo ?? "");
  }, [cargarSolicitudes, modoDatos, token, rol, usuario]);

  
  const alternarModoDatos = useCallback(async () => {
    const nuevoModo = modoDatos === "api" ? "local" : "api";
    await cargarSolicitudes(nuevoModo, token, rol, usuario?.correo ?? "");
    if (nuevoModo === "api") {
      await cargarEstudiantes(token, rol, usuario?.correo ?? "");
    }
  }, [modoDatos, token, rol, usuario, cargarSolicitudes, cargarEstudiantes]);

  
  useEffect(() => {
    let cancelado = false;

    const cargaInicial = async () => {
      let usuarioGuardado = null;
      let tokenGuardado = localStorage.getItem(TOKEN_KEY) || "";

      try {
        const guardado = localStorage.getItem(USUARIO_KEY);
        usuarioGuardado = guardado ? JSON.parse(guardado) : null;
      } catch {
        usuarioGuardado = null;
      }

      await Promise.resolve();
      if (cancelado) return;

      if (tokenGuardado && usuarioGuardado) {
        await cargarSolicitudes("api", tokenGuardado, usuarioGuardado.rol, usuarioGuardado.correo);
        if (cancelado) return;
        await cargarEstudiantes(tokenGuardado, usuarioGuardado.rol, usuarioGuardado.correo);
      } else {
        await cargarSolicitudes("local", "");
      }
    };

    cargaInicial();

    return () => {
      cancelado = true;
    };
  }, [cargarSolicitudes, cargarEstudiantes]);

  
  const solicitudesFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return solicitudes.filter((s) => {
      const coincideEstado = filtroEstado === "Todos" || s.estado === filtroEstado;
      if (!coincideEstado) return false;
      if (!texto) return true;

      return [
        s.codigoRadicado,
        s.tipoTramite,
        s.descripcionDetalle,
        s.justificacion,
        s.estudiante?.nombre,
        s.estudiante?.codigo,
      ]
        .filter(Boolean)
        .some((campo) => String(campo).toLowerCase().includes(texto));
    });
  }, [solicitudes, filtroEstado, busqueda]);

  const metricas = useMemo(() => {
    const base = {
      total: solicitudes.length,
      pendientes: 0,
      enRevision: 0,
      aprobadas: 0,
      rechazadas: 0,
    };

    solicitudes.forEach((s) => {
      if (s.estado === "Pendiente") base.pendientes += 1;
      else if (s.estado === "En Revisión") base.enRevision += 1;
      else if (s.estado === "Aprobada") base.aprobadas += 1;
      else if (s.estado === "Rechazada") base.rechazadas += 1;
    });

    return base;
  }, [solicitudes]);

  const hayFiltrosActivos = filtroEstado !== "Todos" || busqueda.trim() !== "";

  
  const valorContext = useMemo(
    () => ({
      // Estado
      solicitudes,
      solicitudesFiltradas,
      estudiantes,
      metricas,
      cargando,
      error,
      filtroEstado,
      busqueda,
      hayFiltrosActivos,
      modoDatos,
      token,
      usuario,
      miEstudiante,
      permisos,
      
      cargarSolicitudes,
      cargarEstudiantes,
      recargar,
      agregarSolicitud,
      editarSolicitud,
      cambiarEstadoSolicitud,
      eliminarSolicitud,
      establecerFiltroEstado,
      establecerBusqueda,
      limpiarFiltros,
      iniciarSesion,
      cerrarSesion,
      alternarModoDatos,
    }),
    [
      solicitudes,
      solicitudesFiltradas,
      estudiantes,
      metricas,
      cargando,
      error,
      filtroEstado,
      busqueda,
      hayFiltrosActivos,
      modoDatos,
      token,
      usuario,
      miEstudiante,
      permisos,
      cargarSolicitudes,
      cargarEstudiantes,
      recargar,
      agregarSolicitud,
      editarSolicitud,
      cambiarEstadoSolicitud,
      eliminarSolicitud,
      establecerFiltroEstado,
      establecerBusqueda,
      limpiarFiltros,
      iniciarSesion,
      cerrarSesion,
      alternarModoDatos,
    ],
  );

  return <SolicitudesContext.Provider value={valorContext}>{children}</SolicitudesContext.Provider>;
}

export default SolicitudesProvider;
