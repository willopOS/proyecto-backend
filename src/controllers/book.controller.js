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

// Obtener un libro por su ID
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al buscar el libro',
            error: error.message
        });
    }
};
