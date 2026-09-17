import express from 'express';
import { addBookToUser, login, register } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Ruta protegida para añadir libros al usuario
router.post('/add-book', [isAuth], addBookToUser);

export default router;
