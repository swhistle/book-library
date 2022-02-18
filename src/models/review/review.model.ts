import { Schema, model, Document } from 'mongoose';
import { IReview } from './review.interface';

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

export const ReviewModel = model<Document & IReview>('Review', reviewSchema);