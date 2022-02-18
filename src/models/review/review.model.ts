import {Schema, model} from 'mongoose';

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

export default model('Review', reviewSchema);