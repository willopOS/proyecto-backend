import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './src/config/db.js';
import bookRoutes from './src/routes/book.routes.js';
import userRoutes from './src/routes/user.routes.js';

// Inicializar la aplicación Express
const app = express();

// Middlewares globales básicos
app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB Atlas
connectDB();

// Rutas de la API
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
