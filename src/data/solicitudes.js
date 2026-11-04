export const estudiantesLocales = [
  {
    id: "est-1",
    codigo: "ISIL-742910",
    nombre: "Valeria Restrepo",
    carrera: "Ingeniería de Sistemas",
    email: "valeria.restrepo@isil.pe",
    correoUsuario: "valeria@isil.pe",
    avatarUrl: "user.png",
  },
  {
    id: "est-2",
    codigo: "ISIL-738201",
    nombre: "Carlos Mendoza",
    carrera: "Ingeniería de Software",
    email: "carlos.mendoza@isil.pe",
    correoUsuario: "carlos@isil.pe",
    avatarUrl: "user.png",
  },
  {
    id: "est-3",
    codigo: "ISIL-751094",
    nombre: "Andrea Morales",
    carrera: "Administración y Sistemas",
    email: "andrea.morales@isil.pe",
    correoUsuario: "andrea@isil.pe",
    avatarUrl: "user.png",
  },
  {
    id: "est-4",
    codigo: "ISIL-760342",
    nombre: "Mateo Salazar",
    carrera: "Desarrollo de Software",
    email: "mateo.salazar@isil.pe",
    correoUsuario: "mateo@isil.pe",
    avatarUrl: "user.png",
  },
];

// Usuarios del seed de la PA2 para la autenticación simulada del modo local.
export const usuariosLocales = [
  { nombre: "Administrador ISIL", correo: "admin@isil.pe", rol: "administrador" },
  { nombre: "Personal Académico", correo: "personal@isil.pe", rol: "personal" },
  { nombre: "Valeria Restrepo", correo: "valeria@isil.pe", rol: "estudiante" },
  { nombre: "Carlos Mendoza", correo: "carlos@isil.pe", rol: "estudiante" },
  { nombre: "Andrea Morales", correo: "andrea@isil.pe", rol: "estudiante" },
  { nombre: "Mateo Salazar", correo: "mateo@isil.pe", rol: "estudiante" },
];

// Contraseña de demostración (la misma del seed de la PA2).
export const PASSWORD_DEMO = "123";

export function buscarEstudianteLocal(usuario) {
  if (!usuario) return null;

  const correo = String(usuario.correo ?? "").trim().toLowerCase();
  const nombre = String(usuario.nombre ?? "").trim().toLowerCase();
  if (!correo && !nombre) return null;

  return (
    estudiantesLocales.find(
      (e) => correo && String(e.correoUsuario ?? "").toLowerCase() === correo,
    ) ??
    estudiantesLocales.find((e) => nombre && e.nombre.toLowerCase() === nombre) ??
    null
  );
}

/** Solicitudes de referencia con la misma estructura que devuelve la API. */
export const solicitudesLocales = [
  {
    id: "sol-1",
    codigoRadicado: "SOL-2024-001",
    tipoTramite: "Revisión de Calificación Final",
    descripcionDetalle: "Corte 3 • Calificación 2.8 a 3.5",
    fechaRadicacion: "14 Feb 2024",
    estado: "Aprobada",
    justificacion:
      "Solicito la recalificación del tercer examen parcial debido a que los puntos 3 y 4 fueron evaluados con base en una rúbrica desactualizada.",
    estudiante: estudiantesLocales[0],
    createdAt: "2024-02-14T00:00:00.000Z",
  },
  {
    id: "sol-2",
    codigoRadicado: "SOL-2024-002",
    tipoTramite: "Cancelación Extemporánea",
    descripcionDetalle: "Causa de Fuerza Mayor Médica",
    fechaRadicacion: "18 Feb 2024",
    estado: "En Revisión",
    justificacion:
      "Intervención quirúrgica imprevista con orden médica de incapacidad total durante el periodo de evaluaciones.",
    estudiante: estudiantesLocales[1],
    createdAt: "2024-02-18T00:00:00.000Z",
  },
  {
    id: "sol-3",
    codigoRadicado: "SOL-2024-003",
    tipoTramite: "Homologación de Créditos",
    descripcionDetalle: "Electivas de Profundización (6 cr)",
    fechaRadicacion: "21 Feb 2024",
    estado: "Pendiente",
    justificacion:
      "Homologación de dos asignaturas electivas cursadas y aprobadas en el programa previo de Ingeniería de Software.",
    estudiante: estudiantesLocales[2],
    createdAt: "2024-02-21T00:00:00.000Z",
  },
  {
    id: "sol-4",
    codigoRadicado: "SOL-2024-004",
    tipoTramite: "Certificado de Notas con Apostilla",
    descripcionDetalle: "Trámite Bilingüe Español / Inglés",
    fechaRadicacion: "10 Feb 2024",
    estado: "Aprobada",
    justificacion:
      "Emisión de certificado oficial de notas legalizado para postulación a pasantía de investigación internacional.",
    estudiante: estudiantesLocales[0],
    createdAt: "2024-02-10T00:00:00.000Z",
  },
  {
    id: "sol-5",
    codigoRadicado: "SOL-2024-005",
    tipoTramite: "Habilitación Supletoria",
    descripcionDetalle: "Examen extraordinario aprobado con 4.0",
    fechaRadicacion: "02 Feb 2024",
    estado: "Aprobada",
    justificacion:
      "Habilitación supletoria por cruce de horario justificado en el calendario regular de exámenes finales.",
    estudiante: estudiantesLocales[3],
    createdAt: "2024-02-02T00:00:00.000Z",
  },
  {
    id: "sol-6",
    codigoRadicado: "SOL-2024-006",
    tipoTramite: "Beca de Excelencia e Investigación",
    descripcionDetalle: "Exención 100% Matrícula Semestre",
    fechaRadicacion: "24 Feb 2024",
    estado: "Pendiente",
    justificacion:
      "Postulación a la beca institucional de mérito académico e investigación por promedio acumulado superior a 18.5 y publicación en semillero.",
    estudiante: estudiantesLocales[0],
    createdAt: "2024-02-24T00:00:00.000Z",
  },
  {
    id: "sol-7",
    codigoRadicado: "SOL-2024-007",
    tipoTramite: "Revisión de Calificación Final",
    descripcionDetalle: "Corte 2 • Calificación 3.0 a 3.8",
    fechaRadicacion: "26 Feb 2024",
    estado: "Rechazada",
    justificacion:
      "Solicito la recalificación del segundo parcial sustentado en aula, adjuntando el reporte de attendance firmado por el docente.",
    estudiante: estudiantesLocales[1],
    createdAt: "2024-02-26T00:00:00.000Z",
  },
];


export const solicitudesIniciales = solicitudesLocales;
