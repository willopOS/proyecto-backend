import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(' Conexión establecida con éxito a MongoDB Atlas');
    } catch (error) {
        console.error(' Error al conectar con la base de datos:', error.message);
        process.exit(1); // Detiene la aplicación si la base de datos no responde
    }
};