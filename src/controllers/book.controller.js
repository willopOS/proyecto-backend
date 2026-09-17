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

// Crear un nuevo libro en la base de datos
export const createBook = async (req, res) => {
    try {
        const { title, author, genre, year, coverImage } = req.body;

        const newBook = new Book({
            title,
            author,
            genre,
            year,
            coverImage
    });

    const savedBook = await newBook.save();
    return res.status(201).json(savedBook);
    } catch (error) {
    return res.status(500).json({
        message: 'Error al crear el libro',
        error: error.message
        });
    }
};

// Actualizar un libro por su ID
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Pasamos el ID, los nuevos datos y { new: true } para que devuelva el libro ya modificado
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Libro no encontrado para actualizar' });
        }

        return res.status(200).json(updatedBook);
    } catch (error) {
    return res.status(500).json({
        message: 'Error al actualizar el libro',
        error: error.message
        });
    }
};

// Eliminar un libro por su ID
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Libro no encontrado para eliminar' });
        }

        return res.status(200).json({
            message: 'Libro eliminado correctamente',
            book: deletedBook
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el libro',
            error: error.message
        });
    }
};