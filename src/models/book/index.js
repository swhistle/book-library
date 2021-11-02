const {Schema, model} = require('mongoose');

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
    favorite: {
        type: Boolean,
        default: false,
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

module.exports = model('Book', bookSchema);