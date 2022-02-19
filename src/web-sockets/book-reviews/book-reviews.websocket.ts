import { IReview } from '../../models/review/review.interface';
import { ReviewModel } from '../../models/review/review.model';

export const onBookReviewsConnection = async (io: any, socket: any) => {
    const {id} = socket;
    const {roomName} = socket.handshake.query;
    console.log('socket connected:', id, 'roomName', roomName);

    let reviews: IReview[] = [];

    if (roomName) {
        socket.join(roomName);
        reviews = await ReviewModel.find({bookId: roomName}).select('-_id author text');
    }

    if (reviews && reviews.length > 0) {
        socket.emit('review-list-to-book', reviews);
    }

    socket.on('disconnect', () => {
        console.log('socket disconnected:', id);
    });

    socket.on('review-to-book', (review: any) => {
        socket.to(roomName).emit('review-to-book', review);
        socket.emit('review-to-book', review);

        const newReview = new ReviewModel({
            bookId: roomName,
            author: review.author,
            text: review.text,
        });

        try {
            newReview.save();
        } catch (e) {
            console.log(e);
        }
    });
};