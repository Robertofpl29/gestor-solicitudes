
import { configureStore } from "@reduxjs/toolkit";
import preferenciasReducer from "./preferenciasSlice";

// Configuración del almacén global de Redux
export const store = configureStore({
  reducer: {
    preferencias: preferenciasReducer,
  },
});
