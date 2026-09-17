import bcrypt from 'bcrypt';
import { deleteFile } from '../middlewares/file.js';
import { User } from '../models/User.js';
import { generateSign } from '../utils/jwt.js';

// Registro de nuevo usuario (con soporte para subir imagen de perfil)
export const register = async (req, res) => {
    try {
        console.log('Archivo recibido:', req.file);
        const { email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Si se subió un archivo a Cloudinary, capturamos su URL pública; si no, queda vacío
        const image = req.file ? req.file.path : '';

        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'user', // Regla del proyecto: siempre nace con rol 'user'
            image
        });

        const savedUser = await newUser.save();

        // Evitar devolver la contraseña hasheada en la respuesta
        const userResponse = {
            _id: savedUser._id,
            email: savedUser.email,
            role: savedUser.role,
            image: savedUser.image
        };

        return res.status(201).json(userResponse);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
};

// Inicio de sesión (Login)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = generateSign(user._id, user.email);

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
};

// Añadir un libro al array del usuario
export const addBookToUser = async (req, res) => {
    try {
        // El ID del usuario lo obtenemos del token (nuestro middleware isAuth lo guarda en req.user)
        const userId = req.user._id;
        // El ID del libro lo recibiremos por el cuerpo de la petición (JSON)
        const { bookId } = req.body;

        // Buscamos al usuario y actualizamos su array 'books' usando $addToSet
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { books: bookId } },
            { new: true } // Devuelve el documento ya actualizado
        ).select('-password') // Ocultamos la contraseña por seguridad
        .populate('books'); // populate nos trae la info completa del libro, no solo su ID

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al añadir el libro al usuario',
            error: error.message
        });
    }
};

// Cambiar el rol de un usuario (solo accesible por admins)
export const changeRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validamos que el rol enviado sea válido según nuestro enum
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'El rol proporcionado no es válido' });
        }

        // Buscamos y actualizamos el usuario
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            message: 'Rol actualizado con éxito',
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el rol',
            error: error.message
        });
    }
};

// Eliminar un usuario (propia cuenta o cualquier cuenta si es admin)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Comprobamos permisos: ¿Es admin O es el dueño de la cuenta?
        const isSelf = req.user._id.toString() === id;
        const isAdminUser = req.user.role === 'admin';

        if (!isAdminUser && !isSelf) {
            return res.status(403).json({
                message: 'No tienes permiso para eliminar la cuenta de otro usuario'
            });
        }

        const userToDelete = await User.findById(id);

        if (!userToDelete) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Si el usuario tiene una imagen, la borramos de Cloudinary
        if (userToDelete.image) {
            deleteFile(userToDelete.image);
        }

        // Ahora sí, eliminamos el usuario de la base de datos
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            message: 'Usuario eliminado correctamente',
            user: {
                _id: deletedUser._id,
                email: deletedUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};
