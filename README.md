# Mesto API Full - Proyecto de Despliegue e Infraestructura 🚀

¡Hola! Bienvenido al repositorio final de **Mesto**. Este proyecto representa el cierre de mi formación en desarrollo web, donde integré una aplicación completa (Full-Stack) y la mudé desde mi entorno de desarrollo local hacia un servidor real en la nube de Google Cloud.

El objetivo principal de este sprint no fue solo programar, sino entender cómo interactúan el código, las bases de datos y los servidores web en el mundo real bajo entornos de producción seguros.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

### Frontend
- **React** (con **Vite** como empaquetador moderno de producción).
- **JavaScript (ES6+)** y estilos CSS estructurados.

### Backend & Base de Datos
- **Node.js** y **Express** para la construcción de la API REST.
- **MongoDB** como base de datos NoSQL, utilizando **Mongoose** como ODM.
- **Celebrate / Joi** para la validación estricta de datos en los endpoints.
- **Winston** para el registro centralizado de logs (peticiones y errores).

### Infraestructura & Despliegue
- **Google Cloud Platform (GCP)**: Instancia de máquina virtual (Compute Engine) ejecutando **Ubuntu 22.04 LTS**.
- **Nginx**: Servidor web inverso configurado para enrutar el Frontend y mapear el Backend en un subdominio independiente.
- **PM2**: Gestor de procesos en segundo plano para garantizar la disponibilidad continua del servidor de Node.js.

---

## 🔒 Características Principales de Seguridad y Código

1. **Autenticación Segura**: Implementación de inicio de sesión y registro de usuarios utilizando contraseñas encriptadas con `bcryptjs` y sesiones protegidas mediante tokens **JWT (JSON Web Tokens)**.
2. **Protección de Rutas**: Middlewares personalizados instalados para bloquear el acceso a los datos de las tarjetas y perfiles a usuarios que no estén debidamente autenticados.
3. **Manejo Centralizado de Errores**: Todo error generado en el sistema es capturado por un middleware unificado para evitar caídas inesperadas y no exponer datos técnicos sensibles al cliente.
4. **Resiliencia con Crash-Test**: Siguiendo las pautas de evaluación, se incorporó el endpoint `/crash-test` para comprobar la capacidad de recuperación automatizada que ofrece **PM2** ante excepciones no manejadas.
5. **Variables de Entorno**: Configuración estricta del entorno de producción (`NODE_ENV=production`) y resguardo de llaves criptográficas fuera del código fuente mediante archivos `.env`.

---

## ☁️ Arquitectura del Despliegue en la Nube

El despliegue fue realizado directamente en producción dentro de una arquitectura Linux. La distribución de red se organizó de la siguiente manera:

- **Frontend (Interfaz de Usuario)**: Compilado de forma nativa en el servidor y servido de manera directa en el puerto web estándar a través de Nginx.
- **Backend (API REST)**: Corriendo de manera interna y permanente en el puerto `3000` bajo la supervisión de PM2.
- **Redirección**: Configuración de subdominios lógicos en Nginx para separar el tráfico visual del procesamiento de datos, asegurando la comunicación fluida entre ambas capas mediante políticas controladas de **CORS**.

---

## 🧑‍💻 Autor
Proyecto desarrollado, configurado y desplegado con éxito por **Jorge Isaac** (`Isaac14ik`).
