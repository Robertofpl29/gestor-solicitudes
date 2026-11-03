
import { peticion } from "./clienteApi";


export async function listarSolicitudes({ token, estado, codigoAlumno } = {}) {
  const params = new URLSearchParams();
  if (estado) params.set("estado", estado);
  if (codigoAlumno) params.set("codigoAlumno", codigoAlumno);
  const query = params.toString();
  return peticion(`/solicitudes${query ? `?${query}` : ""}`, { token });
}

// Lista las solicitudes del estudiante autenticado (GET /api/solicitudes/mias).
export async function listarMisSolicitudes(token) {
  return peticion("/solicitudes/mias", { token });
}

// Obtiene una solicitud por ObjectId o por código de radicado 
export async function obtenerSolicitud(id, token) {
  return peticion(`/solicitudes/${id}`, { token });
}


export async function crearSolicitud(datos, token) {
  return peticion("/solicitudes", { metodo: "POST", cuerpo: datos, token });
}

// Cambia el estado de una solicitud (Aprobada | En Revisión | Pendiente | Rechazada)
export async function actualizarEstadoSolicitud(id, estado, token) {
  return peticion(`/solicitudes/${id}/estado`, {
    metodo: "PATCH",
    cuerpo: { estado },
    token,
  });
}

//Elimina una solicitud (requiere rol administrador en el backend).
export async function eliminarSolicitud(id, token) {
  return peticion(`/solicitudes/${id}`, { metodo: "DELETE", token });
}

// Lista los estudiantes 
export async function listarEstudiantes(token) {
  return peticion("/estudiantes", { token });
}
