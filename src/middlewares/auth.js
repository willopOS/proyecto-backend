import { User } from '../models/User.js';
import { verifyJwt } from '../utils/jwt.js';

export const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: 'No autorizado: falta el token' });
        }

        // El formato habitual es: "Bearer <token>"
        const [, token] = authorization.split(' ');

        if (!token) {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        // Verificamos el token con la función que creamos en src/utils/jwt.js
        const decoded = verifyJwt(token);

        // Buscamos al usuario en la base de datos para confirmar que sigue existiendo
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Adjuntamos el usuario autenticado a la petición para que el controlador pueda usarlo
        req.user = user;

        // Continuamos hacia el siguiente middleware o controlador
        next();
        } catch (error) {
            return res.status(401).json({
                message: 'Token no válido o expirado',
                error: error.message
            });
        }
};
