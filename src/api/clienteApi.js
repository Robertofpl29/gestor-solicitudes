

import { API_BASE_URL } from "./configApi";

/**
 * Error de negocio de la API.
 * `status` 0 significa que la petición ni siquiera llegó al servidor y el Context lo usa para activar
 * automáticamente el modo demo con datos locales.
 */
export class ApiError extends Error {
  constructor(mensaje, status = 0, payload = null) {
    super(mensaje);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}


function parsearJson(texto) {
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}


export async function peticion(ruta, { metodo = "GET", cuerpo, token } = {}) {
  let respuesta;

  try {
    respuesta = await fetch(`${API_BASE_URL}${ruta}`, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch (error) {
    
    throw new ApiError(
      "No se pudo conectar con la API. ¿El backend de la PA2 está ejecutándose en http://localhost:3000?",
      0,
      error,
    );
  }

  const texto = await respuesta.text();
  const datos = texto ? parsearJson(texto) : null;

  if (!respuesta.ok) {
    const mensaje =
      datos?.mensaje || datos?.error || `La API respondió con el estado ${respuesta.status}.`;
    throw new ApiError(mensaje, respuesta.status, datos);
  }

  return datos;
}
