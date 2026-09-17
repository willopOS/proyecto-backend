import express from 'express';
import { getAllBooks, getBookById } from '../controllers/book.controller.js';

const router = express.Router();

// Ruta para consultar todos los libros
router.get('/', getAllBooks);
router.get('/:id', getBookById);

export default router;
