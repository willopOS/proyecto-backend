import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { generateSign } from '../utils/jwt.js';

// Registro de nuevo usuario
export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        const savedUser = await newUser.save();

        // Evitar devolver la contraseña hasheada en la respuesta
        const userResponse = {
            _id: savedUser._id,
            email: savedUser.email,
            role: savedUser.role
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
