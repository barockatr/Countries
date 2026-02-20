# 🌀 PI Countries
> **Plataforma interactiva para explorar países y gestionar actividades turísticas en todo el mundo.**

[![Ver Demo en Vivo](https://img.shields.io/badge/Ver_Demo_En_Vivo-FF0000?style=for-the-badge&logo=vercel&logoColor=white)](#)
[![Reportar Bug](https://img.shields.io/badge/Reportar_Bug-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tu-usuario/PI-Countries/issues)

![Dashboard Preview](https://via.placeholder.com/800x450.png?text=Vista+Previa+del+Proyecto)

## 📌 El Problema
Encontrar información detallada sobre diferentes países y planificar actividades turísticas suele requerir consultas en múltiples fuentes dispersas, lo que dificulta la organización de viajes o la investigación geográfica. 
**Solución:** PI Countries centraliza datos globales proporcionando una interfaz intuitiva donde los usuarios pueden buscar, filtrar y explorar información de países, además de un sistema integrado para crear y gestionar actividades turísticas personalizadas en múltiples destinos.

## ✨ Características Clave
* **Búsqueda y Exploración Global**: Encuentra rápidamente países por nombre y visualiza detalles clave como capital, subregión, área y población.
* **Filtros Avanzados y Ordenamiento**: Filtra países por continente y tipo de actividad turística. Ordena resultados alfabéticamente o por cantidad de población.
* **Gestión de Actividades Turísticas**: Crea nuevas actividades (ej. Ski, Rafting) definiendo dificultad, duración y temporada, y asígnalas a uno o múltiples países simultáneamente.
* **Navegación Optimizada**: Sistema de paginado eficiente para explorar el listado completo de países de forma fluida.

## 🛠️ Stack Tecnológico
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## 🚀 Instalación Rápida
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/PI-Countries.git
   cd PI-Countries/PI-Countries-main
   ```
2. **Instalar dependencias:**
   ```bash
   # En la carpeta de la API
   cd api
   npm install

   # En la carpeta del cliente
   cd ../client
   npm install
   ```
3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la carpeta `api` con tus credenciales de PostgreSQL:
   ```env
   DB_USER=tu_usuario_postgres
   DB_PASSWORD=tu_password_postgres
   DB_HOST=localhost
   ```
4. **Base de datos:**
   Asegúrate de tener PostgreSQL corriendo y crea una base de datos llamada `countries`.
5. **Ejecutar el proyecto:**
   ```bash
   # Iniciar el servidor (desde la carpeta api)
   npm start

   # Iniciar el cliente (desde la carpeta client en otra terminal)
   npm start
   ```

## 🏗️ Arquitectura y Estructura
El proyecto sigue una arquitectura desacoplada (Decoupled Architecture) para separar responsabilidades y facilitar el testing:
- `api/src/models/`: Definición de modelos relacionales (Country y Activity) con Sequelize, incluyendo la tabla intermedia para la relación N:N.
- `api/src/routes/`: Modularización de endpoints para mantener un ruteo limpio y escalable.
- `client/src/redux/`: Gestión del estado global con Redux, centralizando la lógica de filtros combinados.
- `client/src/components/`: Componentes modulares y reutilizables para el renderizado dinámico de cards y formularios.

## 💻 Implementación Técnica (Best Practices)

### ⚡ Manejo de Asincronía y Data Seeding
Se implementó una lógica de "Seeding" automática en el backend: al iniciar el servidor, la app consume la API externa de países, normaliza los datos y los persiste en **PostgreSQL**. Esto garantiza que la aplicación sea autónoma y las consultas sean ultrarrápidas al ser locales.

### 🛡️ Gestión de Errores (Try/Catch)
Tanto en el cargado inicial de la DB como en la creación de actividades turísticas, se utilizan bloques `try/catch` robustos. Esto previene que una falla en la API externa o un dato duplicado rompan el servidor, devolviendo siempre una respuesta controlada.

### 🧩 Filtros Combinados y Lógica de Estado
El mayor reto técnico fue la implementación de filtros cruzados en el Frontend. Se diseñó una lógica en **Redux** que permite filtrar por continente y actividad simultáneamente, manteniendo la coherencia de los datos y el ordenamiento (población/alfabético) sin perder el estado de la búsqueda actual.

### 🔑 Seguridad en la Base de Datos
Uso estricto de variables de entorno para las credenciales de la DB, evitando la exposición de datos sensibles en el repositorio público.

## 🧠 Retos Técnicos y Decisiones
- **Relación Muchos a Muchos:** Se optó por una tabla intermedia en Sequelize para vincular Actividades y Países, permitiendo que un usuario cree una "Ruta de Trekking" que abarque varios países de una sola vez.
- **Validaciones en el Frontend:** El formulario de actividades turísticas cuenta con validaciones en tiempo real para asegurar que la dificultad (1-5) y la duración sean coherentes antes de enviar el POST al servidor.

## 🗺️ Roadmap (Próximas Mejoras)
- [ ] Implementar un buscador inteligente con "Debounce" para optimizar las peticiones al servidor.
- [ ] Agregar un sistema de favoritos persistente en el navegador.
- [ ] Migrar el CSS a Tailwind o CSS Modules para mejorar el encapsulamiento de estilos.

---

## 👨‍💻 Autor
**Antonio**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](TU_LINKEDIN_REAL)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/barockatr)

---
*Este proyecto fue creado como parte del bootcamp de Soy Henry.*
