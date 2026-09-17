import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from '../models/Book.js';

dotenv.config();

const initialBooks = [
    {
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        genre: 'Realismo mágico',
        year: 1967,
        coverImage: 'https://covers.openlibrary.org/b/id/15219095-L.jpg'
    },
    {
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        genre: 'Novela clásica',
        year: 1605,
        coverImage: 'https://covers.openlibrary.org/b/id/6927800-L.jpg'
    },
    {
        title: '1984',
        author: 'George Orwell',
        genre: 'Distopía',
        year: 1949,
        coverImage: 'https://covers.openlibrary.org/b/id/15158861-L.jpg'
    },
    {
        title: 'El principito',
        author: 'Antoine de Saint-Exupéry',
        genre: 'Fábula',
        year: 1943,
        coverImage: 'https://covers.openlibrary.org/b/id/14851577-L.jpg'
    },
    {
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        genre: 'Ciencia ficción',
        year: 1953,
        coverImage: 'https://covers.openlibrary.org/b/id/12721897-L.jpg'
    }
];

    const seedBooks = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(' Conectado a MongoDB Atlas para ejecutar seed');

        // Borrar colección existente para evitar duplicados
        await Book.collection.drop().catch(() => {
            console.log('ℹ Colección books aún no existía, se creará nueva.');
        });
        console.log(' Colección previa limpiada');

        // Insertar libros iniciales
        await Book.insertMany(initialBooks);
        console.log(` Insertados con éxito ${initialBooks.length} libros`);
    } catch (error) {
        console.error(' Error al ejecutar la semilla:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log(' Conexión cerrada tras finalizar el seed');
        process.exit(0);
    }
};

seedBooks();
