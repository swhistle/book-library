const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    bookId: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

module.exports = model('Review', reviewSchema);