import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const User = mongoose.model('User', userSchema);
