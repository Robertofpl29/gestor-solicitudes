
import { createSlice } from "@reduxjs/toolkit";

// Estado inicial de las preferencias
const initialState = {
  vista: "lista",
  mostrarEstadisticas: true,
};

// Creación del Slice
const preferenciasSlice = createSlice({
  name: "preferencias",
  initialState,

  reducers: {
    cambiarVista: (state, action) => {
      state.vista = action.payload;
    },

    alternarEstadisticas: (state) => {
      state.mostrarEstadisticas = !state.mostrarEstadisticas;
    },
  },
});

// Exportar acciones
export const {
  cambiarVista,
  alternarEstadisticas,
} = preferenciasSlice.actions;

// Exportar reducer
export default preferenciasSlice.reducer;
