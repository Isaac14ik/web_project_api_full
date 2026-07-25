# Around The U.S. (Mesto) - Full Stack Application

### Desarrollado por: **Jorge Nava** 🚀
*Proyecto Final de Graduación - Tripleten Web Development Program*

---

## 📝 Descripción del Proyecto
**Around The U.S. (Mesto)** es una aplicación web Full Stack interactiva que permite a los usuarios registrarse, iniciar sesión de forma segura y compartir fotografías de paisajes emblemáticos de los Estados Unidos. Los usuarios pueden interactuar en tiempo real agregando nuevas tarjetas de lugares, eliminando su propio contenido y dando o quitando "Me Gusta" (likes) en las publicaciones de la comunidad. 

El proyecto integra un Frontend responsivo construido en React con un Backend robusto desarrollado en Node.js, comunicándose de manera nativa mediante una API REST protegida por autenticación basada en tokens JWT.

---

## 🌐 Enlaces de Acceso (URL de la App)
El proyecto se encuentra totalmente desplegado en la nube y puede ser auditado de forma pública a través de las siguientes direcciones web:

*   **Aplicación Web (Frontend):** [http://34.30.121.2](http://34.30.121.2)
*   **Servidor de la API (Backend):** [http://34.30.121](http://34.30.121)

---

## 🛠️ Tecnologías y Técnicas Utilizadas

### Frontend
*   **React.js (v18):** Arquitectura basada en componentes funcionales y Hooks avanzados (`useState`, `useEffect`, `useContext`).
*   **React Router Dom (v5):** Manejo de enrutamiento dinámico y protección de rutas privadas mediante componentes de tipo `ProtectedRoute`.
*   **Vite:** Herramienta de empaquetado y compilación optimizada para entornos de desarrollo y producción rápida.
*   **CSS3:** Diseño totalmente responsivo adaptado a dispositivos móviles, tabletas y pantallas de escritorio mediante metodologías estructuradas (BEM).

### Backend
*   **Node.js & Express.js (v5):** Creación del servidor web, manejo de controladores de lógica de negocio y enrutamiento modular REST de peticiones HTTP (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`).
*   **MongoDB & Mongoose:** Base de datos NoSQL para el almacenamiento persistente de colecciones unificadas de Usuarios y Tarjetas mediante esquemas estrictos de validación de datos.
*   **CORS (Cross-Origin Resource Sharing):** Configuración unificada mediante middlewares y comodines nativos (`/{*splat}`) para permitir la transferencia cruzada de datos segura entre dominios.
*   **Autenticación y Seguridad:** Encriptación de contraseñas mediante hashing con `bcryptjs`, protección y firma de sesiones privadas con Tokens Web JSON (`JWT`) con expiración estricta de 7 días.
*   **Celebrate & Joi:** Middleware de validación estricta de esquemas y cuerpos de solicitudes HTTP en el lado del servidor antes de tocar la base de datos (bloqueo automático de errores 400).
*   **Winston:** Manejo centralizado e independiente de registros de actividad del servidor generados dinámicamente en archivos locales (`request.log` y `error.log`).

### Infraestructura y Despliegue (DevOps)
*   **Google Cloud Platform (GCP):** Despliegue completo sobre una máquina virtual remota basada en Compute Engine.
*   **Nginx:** Configuración del servidor web de producción como proxy inverso unificado para redirigir peticiones web estándar y servir contenido estático optimizado.
*   **PM2:** Administrador de procesos en segundo plano para garantizar la persistencia del backend, reiniciando la API automáticamente ante caídas del servidor controladas (`/crash-test`).

---

## 📸 Funcionalidades Clave y Capturas de Pantalla

1. **Registro e Inicio de Sesión Seguro:** Los usuarios crean cuentas y acceden validando credenciales de forma encriptada en la base de datos remota.
2. **Edición del Perfil Dinámica:** Los usuarios pueden modificar su información pública (Nombre y Descripción de Explorador) actualizando el estado de la base de datos de manera instantánea mediante peticiones `PATCH`.
3. **Publicación y Renderizado de Tarjetas:** Creación de nuevos elementos visuales proporcionando enlaces directos de imágenes de internet (`.jpg`, `.png`, `.webp`).
4. **Interactividad Completa:** Sistema inteligente de Likes que almacena arreglos de IDs de usuarios en MongoDB para evitar duplicidad y botón de borrado físico exclusivo para el propietario de la tarjeta.

*(Se recomienda incluir capturas de pantalla de la interfaz cargada en la IP de Google Cloud dentro del repositorio definitivo).*

---

## 🚀 Instrucciones para Ejecución Local

### Clonar el repositorio:
```bash
git clone https://github.com
cd WEB_PROJECT_API_FULL
```

### Configurar el Backend:
1. Navega a la carpeta `backend` e instala dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Crea un archivo `.env` local con los siguientes valores de desarrollo:
   ```text
   NODE_ENV=development
   JWT_SECRET=super-strong-secret-key
   ```
3. Enciende el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Configurar el Frontend:
1. Abre una nueva terminal, navega a la carpeta `frontend` e instala dependencias:
   ```bash
   cd ../frontend
   npm install
   ```
2. Crea un archivo `.env` local:
   ```text
   VITE_API_URL=http://localhost:3000
   ```
3. Enciende el servidor de desarrollo de React:
   ```bash
   npm run dev
   ```
