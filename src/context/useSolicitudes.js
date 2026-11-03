import { useContext } from "react";

import { SolicitudesContext } from "./SolicitudesContext";

export function useSolicitudes() {
  const contexto = useContext(SolicitudesContext);

  if (contexto === null || contexto === undefined) {
    throw new Error(
      "useSolicitudes() se está usando fuera de <SolicitudesProvider>. " +
        "Envuelve la aplicación con el Provider en src/App.jsx.",
    );
  }

  return contexto;
}

export default useSolicitudes;