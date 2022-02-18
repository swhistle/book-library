import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    authors: {
        type: String,
        required: true,
        default: "",
    },
    fileCover: {
        type: String,
        required: true,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    }
});

export default model('Book', bookSchema);