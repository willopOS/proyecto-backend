import express from 'express';
import {
    addBookToUser,
    changeRole,
    deleteUser,
    login,
    register
} from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.js';
import { upload } from '../middlewares/file.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Rutas públicas
router.post('/register', upload.single('image'), register); // Ruta actualizada con Multer
router.post('/login', login);

// Rutas de usuario autenticado
router.post('/add-book', [isAuth], addBookToUser);
router.delete('/:id', [isAuth], deleteUser); // Borrado controlado

// Rutas de administración: requiere estar autenticado y ser admin
router.put('/:id/role', [isAuth, isAdmin], changeRole);

export default router;
