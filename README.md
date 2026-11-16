
# 🏥 Centro Médico Blondie-Salud

Proyecto desarrollado para la asignatura **Fullstack II - Ingeniería en Informática, Duoc UC**.

Blondie-Salud es una aplicación web que permite gestionar pacientes y reservas de atención médica mediante una interfaz sencilla y conectada a una API REST.

## 🛠️ Tecnologías utilizadas

- React + Vite
- JavaScript
- HTML y CSS
- Bootstrap
- React Router
- Fetch API

## 📋 Funcionalidades

### Gestión de usuarios
- Registro de pacientes con validaciones.
- Inicio de sesión con autenticación JWT.
- Acceso según roles: administrador, recepcionista y paciente.
- Gestión de pacientes mediante operaciones CRUD.

### Agendamientos
- Reserva de horas médicas por especialidad y profesional.
- Agendamiento de tomas de muestras de laboratorio.
- Reagendamiento de horas médicas.
- Validación de disponibilidad de horarios.
- Generación de números de orden para las reservas.

### Panel del paciente
- Visualización de información personal.
- Consulta de horas médicas agendadas.
- Consulta de reservas de laboratorio.
- Visualización del estado de las reservas.

## 🚀 Instalación y ejecución

Clonar el repositorio:

    git clone -b ep3-fullstack https://github.com/Priss-x/CM-Blondie-Salud.git

Ingresar al proyecto:

    cd CM-Blondie-Salud

Instalar dependencias:

    npm install

Ejecutar la aplicación:

    npm run dev

El frontend se ejecuta localmente y necesita que el backend esté funcionando en `http://localhost:3000`.

## 🔗 Backend

La aplicación se conecta a una API REST desarrollada con Node.js y Express, que incluye autenticación JWT, gestión de pacientes, agendamientos y documentación Swagger.

Repositorio del backend:

https://github.com/Priss-x/Blondie-Salud-Backend

## 📌 Consideraciones

- Los datos se gestionan mediante el backend.
- Actualmente, el almacenamiento del servidor es temporal y se reinicia al detenerlo.
- Proyecto desarrollado con fines académicos.

---

**Desarrollado por:** Priscila Contreras  
