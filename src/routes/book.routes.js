import express from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook
} from '../controllers/book.controller.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

// Rutas públicas (cualquiera puede leer)
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Ruta protegida (requiere token válido)
router.post('/', [isAuth], createBook);
router.put('/:id', [isAuth], updateBook);

export default router;