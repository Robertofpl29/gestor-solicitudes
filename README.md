# PA3. PWA — Gestor de Solicitudes

**Asignatura:** Programación Web Avanzada 2026-II

---

## 1. Integrantes

| Integrante | Rol | Aporte principal |
|---|---|---|
| Roberto Palacios Lara | Developer / Frontend | **Actividad 1:** Estructura base de la SPA en React, creación de componentes principales (`SolicitudForm`, `SolicitudList`, `SolicitudItem`, `Navbar`) y lógica con Hooks (`useState`, `useEffect`). |
| Aaron Pereyra Cabrejos | Developer / Frontend | **Actividad 2:** Configuración e implementación de navegación entre vistas utilizando React Router sin recargar la página. |
| Diana Clabel | Developer / Frontend | **Actividad 3:** Implementación del proveedor (`SolicitudesProvider`) y contexto global (`SolicitudesContext`) mediante Context API. |
| Jose Miguel Polick | Developer / Frontend | **Actividad 3:** Integración del consumo de Context API en los componentes de la aplicación y actualización del estado global. |
| Giancarlo Quispe | Developer / Frontend | **Actividad 4:** Implementación básica del flujo de estado con Redux Toolkit y documentación de la comparación técnica entre Context API y Redux. |

---

## 2. Descripción y objetivo

### Problema
La plataforma de gestión de solicitudes académicas requiere una interfaz frontend moderna (SPA) que permita consultar, registrar y filtrar solicitudes de forma interactiva, reaccionando a los cambios de datos en tiempo real y centralizando el manejo de datos dinámicos.

### Objetivo
Desarrollar una **Single Page Application (SPA)** modular utilizando **React.js y Vite**, integrando Hooks (`useState`, `useEffect`), navegación cliente con **React Router**, y gestión de estado global combinando **Context API** y una exploración práctica de **Redux** (sin consumo de APIs externas ni autenticación JWT en esta etapa).

### Solución desarrollada
Se construyó una aplicación con React organizada modularmente en componentes reutilizables (`components/`), almacenamiento inicial local (`data/solicitudes.js`) y vistas diferenciadas. Se implementó un flujo completo para la creación, filtrado y visualización de solicitudes académicas, con actualización global e instantánea del estado mediante Context API y Redux.

---

## 3. Descripción del proyecto

**Gestor de Solicitudes** es una aplicación web interactiva desarrollada con React y Vite. Está diseñada para facilitar la administración, creación, filtrado y seguimiento de solicitudes dentro de una organización o entorno académico de manera eficiente y centralizada.

El objetivo principal es proveer una solución dinámica, intuitiva y *responsive* para el registro y control del estado de diversas solicitudes, aplicando buenas prácticas de desarrollo web moderno mediante componentes reutilizables y manejo eficiente del estado en React.

### Arquitectura propuesta

La aplicación sigue una arquitectura modular estructurada por componentes:

- **`App.jsx`**: componente base; define la estructura general de la app y las rutas.
- **`Navbar.jsx`**: barra superior de navegación y encabezado principal.
- **`SolicitudForm.jsx`**: registro de nuevas solicitudes con validación de datos.
- **`SolicitudList.jsx` y `SolicitudItem.jsx`**: renderizado iterativo y visualización individual de cada registro.
- **`Filtro.jsx`**: búsqueda y filtrado de solicitudes por estado o categoría.
- **`EstadoGlobalPanel.jsx`**: panel de visualización del estado global.
- **`solicitudes.js`**: datos *mock* / semilla para inicializar el sistema con información de prueba.

### Estructura de archivos del repositorio

```plaintext
gestor-solicitudes/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   ├── authApi.js
│   │   ├── clienteApi.js
│   │   ├── configApi.js
│   │   └── solicitudesApi.js
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── EstadoGlobalPanel.jsx
│   │   ├── Filtro.jsx
│   │   ├── Navbar.jsx
│   │   ├── SolicitudForm.jsx
│   │   ├── SolicitudItem.jsx
│   │   └── SolicitudList.jsx
│   ├── context/
│   │   ├── SolicitudesContext.jsx
│   │   └── useSolicitudes.js
│   ├── data/
│   │   └── solicitudes.js
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   └── ListadoSolicitudes.jsx
│   ├── .env
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .oxlintrc.json
├── README.md
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

---

## 4. Requisitos previos y ejecución

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Gestor de paquetes `npm`
- Visual Studio Code (recomendado)

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPOSITORIO>
cd gestor-solicitudes

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 5. Evidencias de ejecución y pruebas

### Formulario de registro
<!-- Reemplazar con la ruta de la captura -->
![Formulario de registro](./docs/formulario.png)

### Listado de solicitudes y filtros
<!-- Reemplazar con la ruta de la captura -->
![Listado y filtros](./docs/listado.png)

---

## 6. Componentes y estructura del sistema

| Componente | Ubicación | Descripción |
|---|---|---|
| `Navbar.jsx` | `src/components/` | Barra de navegación superior y cabecera principal. |
| `SolicitudForm.jsx` | `src/components/` | Formulario para registrar nuevas solicitudes con validación. |
| `SolicitudList.jsx` | `src/components/` | Contenedor dinámico que renderiza las solicitudes según los filtros. |
| `SolicitudItem.jsx` | `src/components/` | Tarjeta individual que muestra el detalle de cada solicitud. |
| `Filtro.jsx` | `src/components/` | Búsqueda y filtrado por estado o tipo de trámite. |
| `solicitudes.js` | `src/data/` | Dataset con datos semilla para probar las funciones de la SPA. |

---

## 7. Resumen por actividades

- **Actividad 1 — SPA en React con JSX, componentes y Hooks (Roberto):** creación y modularización de la interfaz en componentes React (`SolicitudForm`, `SolicitudList`, etc.). Implementación de `useState` para el manejo de formularios y filtros locales, y `useEffect` para la inicialización y renderizado de la lista de solicitudes.
- **Actividad 2 — Navegación con React Router (Aaron):** configuración de enrutamiento del lado del cliente (`BrowserRouter`, `Routes`, `Route`, `Link`/`NavLink`), garantizando la separación de vistas y una experiencia fluida sin recargas de página.
- **Actividad 3 — Estado global con Context API (Diana y Jose):** creación del contexto global (`SolicitudesContext`) y su Provider para evitar el *prop drilling*, permitiendo que múltiples componentes actualicen y consuman el listado de solicitudes de forma centralizada.
- **Actividad 4 — Introducción a Redux y comparación técnica (Giancarlo):** implementación práctica de un slice/store de Redux para la gestión de preferencias o estados acotados, y documentación comparativa entre la simplicidad de Context API y la arquitectura estructurada de Redux.

---

## 8. Comparación técnica: Context API vs. Redux

| Criterio | Context API | Redux (Redux Toolkit) |
|---|---|---|
| **Propósito principal** | Inyección de dependencias y evitar *prop drilling*. | Gestión de estado predecible a gran escala con arquitectura unidireccional. |
| **Complejidad de setup** | Mínima; viene nativo en React (`createContext`, `useContext`). | Media; requiere instalar librerías, definir store, reducers y actions. |
| **Rendimiento / re-renders** | Todo componente suscrito al contexto se re-renderiza cuando el valor cambia. | Optimizado por defecto mediante selectores (`useSelector`). |
| **Uso recomendado en el proyecto** | Ideal para estados globales sencillos (tema, lista general de solicitudes). | Ideal si el estado se vuelve complejo o requiere trazabilidad / DevTools. |

---

## 9. Matriz de participación

| Integrante | Desarrollo | Pruebas | Documentación | Exposición |
|---|---|---|---|---|
| Roberto Palacios Lara | Media | Alta | [Sí/No] | **Actividad 1:** maquetación e implementación de componentes funcionales en React (`SolicitudForm`, `SolicitudList`, `SolicitudItem`), definición de JSX, gestión de estado local con `useState` y ciclos de vida con `useEffect`. |
| Aaron Pereyra Cabrejos | Media | Alta | [Sí/No] | **Actividad 2:** configuración completa de React Router, estructura de rutas principales, enlaces de navegación SPA (`Link`/`NavLink`) y preservación del estado entre vistas. |
| Diana Clabel | Media | Alta | [Sí/No] | **Actividad 3:** creación e infraestructura de Context API (`SolicitudesContext`), definición del Provider principal y lógica de mutación de estado global. |
| Jose Miguel Polick | Media | Media | [Sí/No] | **Actividad 3:** consumo e integración del Context API en componentes de presentación (`SolicitudForm`, `SolicitudList`), asegurando la reactividad al agregar y modificar datos. |
| Giancarlo Quispe | Alta | Media | [Sí/No] | **Actividad 4:** implementación de Redux Toolkit (Store, Slices, Dispatchers), pruebas de flujo unidireccional y análisis comparativo Context API vs. Redux. |

---

## 10. Video de exposición

📹 Video público de YouTube: [https://www.youtube.com/watch?v=KnkF5wLbQyM](https://www.youtube.com/watch?v=KnkF5wLbQyM)

---

## 11. Conclusiones

- **Componentes y Hooks (Actividad 1):** la modularidad de React facilita el mantenimiento del código. El uso combinado de `useState` y `useEffect` permitió manipular eficientemente el estado local del formulario e iterar listas de datos de forma dinámica.
- **Navegación SPA (Actividad 2):** la integración de React Router mejoró la experiencia de usuario al permitir transiciones fluidas entre páginas sin refrescar el navegador.
- **Context API (Actividad 3):** centralizar la información en un Provider global resolvió el problema del *prop drilling*, permitiendo que componentes distantes sincronicen datos compartidos de manera limpia.
- **Redux y estado global (Actividad 4):** Redux demostró ser una alternativa robusta para escenarios complejos con herramientas de depuración avanzadas, aunque Context API resulta más que suficiente y ligero para proyectos medianos.
- **Trabajo colaborativo:** la organización del equipo por actividades individuales y cruzadas permitió cubrir todos los aspectos del frontend de la SPA de manera eficiente y escalable.
