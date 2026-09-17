export const isAdmin = (req, res, next) => {
    try {
        // Comprobamos si el usuario autenticado tiene el rol 'admin'
        if (req.user && req.user.role === 'admin') {
            return next(); // Si es admin, continúa a la siguiente función
        }

        // Si no es admin, bloqueamos el acceso con 403 (Prohibido)
        return res.status(403).json({
            message: 'Acceso denegado: se requieren permisos de administrador'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la verificación de permisos',
            error: error.message
        });
    }
};
