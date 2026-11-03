// la configuración  que consume el Provider
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";


export const ESTADOS_SOLICITUD = ["Pendiente", "En Revisión", "Aprobada", "Rechazada"];


export const OPCIONES_FILTRO = ["Todos", ...ESTADOS_SOLICITUD];

export const TIPOS_TRAMITE = [
  "Revisión de Calificación Final",
  "Cancelación Extemporánea",
  "Homologación de Créditos",
  "Certificado de Notas con Apostilla",
  "Habilitación Supletoria",
  "Beca de Excelencia e Investigación",
];

//Claves de almacenamiento local de la sesión .
export const TOKEN_KEY = "isil_pa3_token";
export const USUARIO_KEY = "isil_pa3_usuario";
