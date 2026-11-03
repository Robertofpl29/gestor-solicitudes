//Infraestructura y lógica del Context 
import { peticion } from "./clienteApi";

/**
 * type comments
 * Inicia sesión y devuelve { mensaje, usuario, token }.
 * @param {string} correo
 * @param {string} password
 */
export async function iniciarSesion(correo, password) {
  return peticion("/auth/login", {
    metodo: "POST",
    cuerpo: { correo, password },
  });
}


export async function obtenerPerfil(token) {
  return peticion("/auth/me", { token });
}
