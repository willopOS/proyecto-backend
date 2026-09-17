import express from 'express';
import { getAllBooks } from '../controllers/book.controller.js';

const router = express.Router();

// Ruta para consultar todos los libros
router.get('/', getAllBooks);

export default router;