import { Book } from '../models/Book.js';

// Obtener todos los libros de la base de datos
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({
        message: 'Error al obtener los libros',
        error: error.message
        });
    }
};
