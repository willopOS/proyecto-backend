# 🚀 Proyecto Backend - REST API

Una API REST completa desarrollada en Node.js, Express y MongoDB, con autenticación, subida dinámica de imágenes y gestión de roles. Proyecto final para el módulo de Backend.

## 🛠️ Tecnologías Utilizadas

- **Entorno & Framework:** Node.js, Express
- **Base de Datos:** MongoDB Atlas, Mongoose
- **Seguridad:** JSON Web Tokens (JWT), Bcrypt
- **Gestión de Archivos:** Cloudinary, Multer, Multer-storage-cloudinary
- **Desarrollo:** Nodemon, Dotenv

## ⚙️ Instalación y Uso

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno:
   *Nota: Por indicaciones específicas para la corrección de este proyecto educativo, el archivo `.env` ha sido subido al repositorio. Normalmente, este archivo debe ser ignorado por Git.*
   
   Asegúrate de que las credenciales de MongoDB, JWT y Cloudinary estén activas en tu `.env`.

3. Poblar la base de datos (Semilla):
   Ejecuta el siguiente comando para cargar el catálogo inicial de libros en MongoDB:
   ```bash
   npm run seed:books
   ```

4. Iniciar el servidor (Modo desarrollo):
   ```bash
   npm run dev
   ```
   El servidor correrá en `http://localhost:3000`.

## 📡 Endpoints Principales

### Usuarios (`/api/users`)
- `POST /register` - Registra un nuevo usuario (nace con rol `user`). Soporta subida de imagen (`multipart/form-data`).
- `POST /login` - Autentica al usuario y devuelve el token JWT.
- `POST /add-book` - Añade un libro al array del usuario autenticado (evita duplicados). **[Requiere Auth]**
- `PUT /:id/role` - Cambia el rol de un usuario (`user` a `admin`). **[Requiere Auth + Admin]**
- `DELETE /:id` - Elimina un usuario de la BD y destruye su avatar en Cloudinary. **[Solo dueño de la cuenta o Admin]**

### Libros (`/api/books`)
- `GET /` - Devuelve la lista de todos los libros disponibles en el catálogo.
- `GET /:id` - Devuelve los detalles de un libro específico según su ID.
- `POST /` - Crea un nuevo libro en la base de datos. **[Requiere Auth]**
- `PUT /:id` - Actualiza la información de un libro existente. **[Requiere Auth]**
- `DELETE /:id` - Elimina un libro del catálogo. **[Requiere Auth]**

## 🔐 Roles y Permisos
- **User:** Puede registrarse, iniciar sesión, añadir libros a su perfil y eliminar su propia cuenta. No puede modificarse su propio rol ni eliminar a otros.
- **Admin:** Posee control total. Puede cambiar roles de otros usuarios y eliminar cualquier cuenta del sistema.

## 🧑‍💻 Autor
Alejandra Wilches