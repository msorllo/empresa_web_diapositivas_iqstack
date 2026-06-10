# ☀️ IQ STACK — Hosting Ecológico & Control Solar de Alto Rendimiento

¡Bienvenido a **IQ STACK**! Una plataforma de hosting ecológico diseñada bajo un estándar de alta gama, alto rendimiento y sostenibilidad real. Este repositorio integra un panel de control interactivo (Single Page Application) conectado en tiempo real a una base de datos **SQLite** mediante una arquitectura limpia y robusta (**Clean Architecture**).

---

## 🚀 Características Principales

*   **☀️ Monitorización Solar en Tiempo Real**: Panel de control con gráficos interactivos (**Chart.js**) y cálculos dinámicos de kWh generados, consumidos e impacto ecológico (CO₂ evitado y árboles plantados).
*   **👥 Control Multirrol y Persistencia**:
    *   **Administrador Global**: Control absoluto de clientes (activar/suspender), visualización y respuesta en tiempo real a todos los tickets de soporte del sistema, y emisión manual de facturas.
    *   **Cliente (PYME / ONG)**: Gestión autónoma de recursos, visualización de métricas de su servidor, historial de facturación y chat de soporte en vivo.
    *   **Sesiones Persistentes**: La SPA utiliza `localStorage` para restaurar instantáneamente el estado y el rol del usuario al recargar la página, cargando dinámicamente todos sus datos de SQLite sin pasar por el login.
*   **💬 Soporte Técnico Humano con Chat Interactivo**: Hilos de conversación dinámicos entre cliente y técnico asignado (Unai García o Marco Sorlí) con persistencia en base de datos.
*   **💳 Facturación e Impresión PDF**: Historial de facturas y descargas instantáneas de copias digitales firmadas electrónicamente en formato PDF mediante blobs seguros.
*   **🌿 Diseño Premium e Interactividad**: Efectos *Typewriter*, tarjetas interactivas tridimensionales (*Tilt 3D Cards*) y un cubo 3D representativo de la infraestructura solar verde.

---

## 🏛️ Estructura del Ecosistema

Siguiendo principios **S.O.L.I.D.** y de **Separación de Responsabilidades (SoC)**, el proyecto está estructurado de la siguiente forma:

```
IQSTACK/
├── backend_IQStack/         # Servidor backend de alto rendimiento
│   ├── src/
│   │   ├── config/          # Variables de entorno y configuraciones
│   │   ├── infrastructure/  # Wrapper de conexión a SQLite (db.js)
│   │   ├── middlewares/     # Manejador global de errores (errorHandler.js)
│   │   ├── modules/         # Dominios atómicos (auth, admin, client)
│   │   └── server.js        # Punto de entrada de Express (sirve estáticos y APIs)
│   ├── package.json
│   └── package-lock.json
├── web_IQStack/             # Frontend premium (Vibe & Aesthethics)
│   ├── index.html           # Landing page corporativa (Efectos 3D & Typewriter)
│   ├── code.html            # SPA del Panel de Cliente & Administrador
│   └── screen.png           # Captura de pantalla del panel principal
├── BASE DE DATOS/           # Copias y esquemas de la DB SQLite
│   └── iqstack.db           # Base de datos SQLite sembrada
├── Especificación_de_requerimentos.md
└── DB_Architecture_IQSTACK_FINAL.md
```

---

## ⚙️ Instrucciones de Ejecución Local

Sigue estos sencillos pasos para levantar el proyecto al completo en cualquier ordenador local en menos de un minuto:

### Paso 1: Instalar dependencias
Abre una terminal en la carpeta del backend e instala los módulos de Node.js:
```bash
cd backend_IQStack
npm install
```

### Paso 2: Iniciar el Servidor Backend
Levanta la aplicación:
```bash
node src/server.js
```
El servidor levantará la base de datos local SQLite y expondrá los servicios en el puerto **3000**.

### Paso 3: Disfrutar del Proyecto
Abre tu navegador de preferencia y accede a:
👉 **[http://localhost:3000/](http://localhost:3000/)**

Aterrizarás en la página principal corporativa (`index.html`). Haz clic en **"Panel Cliente"** en el menú superior o en los CTAs para acceder al panel dinámico de control de usuarios (`code.html`).

---

## 🔑 Credenciales de Prueba

Para agilizar el testeo de los diferentes roles, puedes usar los botones de **"Accesos Directos (Demo)"** en la pantalla de inicio o introducir las credenciales manualmente:

### 👤 Rol Cliente (Rosa López - Panadería López SL)
*   **Email**: `rosa@panaderialopez.com`
*   **Contraseña**: `password123`

### 🛡️ Rol Administrador (Marco Sorli - IQ STACK)
*   **Email**: `admin@iqstack.es`
*   **Contraseña**: `admin123`

---

## 📽️ Presentación Interactiva 3D (TFG)

En la carpeta [PRESENTACIÓN](file:///c:/Users/msorl/Desktop/PROYECTOS%20PC/IQSTACK/PRESENTACI%C3%93N) se encuentra la web oficial de presentación del proyecto IQSTACK para su defensa académica.

### Características de la Presentación:
*   **Diseño de Pantalla Dividida (Split Screen)**: Visualización unificada que muestra en paralelo:
    *   **💻 Canal Comercial/Web (Izquierda)**: Elementos visuales como el **cubo 3D de servidor** girable por arrastre, **simulador ecológico** interactivo de visitas (kWh, CO₂ evitado, árboles plantados) y el **diagrama dinámico de flujo solar**.
    *   **🎓 Canal Académico/TFG (Derecha)**: Información académica estructurada del proyecto de fin de ciclo formativo (Metodología Scrum/Kanban, matrices PESTEL y Porter con mitigación, alineación ODS, **tabla de tesorería mensual de 12 meses** y hitos legales para la constitución de la S.L.).
*   **Topología de Red Interactiva**: Incorporación del diagrama draw.io original del proyecto con un modal zoomable al hacer clic.
*   **Notas del Presentador Sincronizadas**: Un panel inferior desplegable con el discurso oral (speech) exacto redactado para el ponente en cada diapositiva.
*   **Navegación Fluida**: Soporte completo para teclas de flecha (`Flecha Derecha`/`Flecha Izquierda`), barra espaciadora, swipes táctiles en dispositivos móviles y dots interactivos.

Para visualizar la presentación, simplemente haz doble clic en:
👉 **[PRESENTACIÓN/index.html](file:///c:/Users/msorl/Desktop/PROYECTOS%20PC/IQSTACK/PRESENTACI%C3%93N/index.html)**

---

## 📦 Notas de Distribución

Este proyecto ha sido preparado para una distribución limpia y profesional:
*   Se ha configurado un archivo `.gitignore` robusto que excluye carpetas de desarrollo interno (como `SKILLS/`, `.gemini/` y `node_modules/`), reduciendo el tamaño de descarga al mínimo y conservando únicamente el código funcional y los recursos necesarios.
*   **Base de datos autocontenida**: Al usar **SQLite**, la base de datos se guarda en un único archivo portable. Esto significa que **cualquier persona a la que compartas el proyecto podrá ejecutarlo de inmediato sin configurar servidores de bases de datos externos**.
