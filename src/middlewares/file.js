import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuramos Cloudinary con las variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Definimos la carpeta de destino y formatos permitidos
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users_avatars', // Nombre de la carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

// Creamos el middleware de subida con multer
export const upload = multer({ storage });

// Función para eliminar imágenes de Cloudinary
export const deleteFile = (imgUrl) => {
    // Dividimos la URL por barras (/)
    const imgSplited = imgUrl.split('/');
    
    // Obtenemos las dos últimas partes (carpeta y nombre del archivo con extensión)
    const folderName = imgSplited.at(-2);
    const fileName = imgSplited.at(-1);

    // Separamos el nombre del archivo de su extensión (ej: foto.jpg -> foto)
    const nameSplited = fileName.split('.');
    const publicId = `${folderName}/${nameSplited[0]}`;

    // Le decimos a Cloudinary que destruya la imagen con ese publicId
    cloudinary.uploader.destroy(publicId, () => {
        console.log('Imagen eliminada de Cloudinary');
    });
};
