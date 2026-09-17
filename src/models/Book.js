import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'El autor es obligatorio'],
            trim: true
        },
        genre: {
            type: String,
            required: [true, 'El género es obligatorio'],
            trim: true
        },
        year: {
            type: Number,
            required: [true, 'El año de publicación es obligatorio']
        },
        coverImage: {
            type: String,
            default: ''
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Book = mongoose.model('Book', bookSchema);
