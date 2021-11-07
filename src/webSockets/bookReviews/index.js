const Review = require('../../models/review');

const onBookReviewsConnection = async (io, socket) => {
    const {id} = socket;
    const {roomName} = socket.handshake.query;
    console.log('socket connected:', id, 'roomName', roomName);

    let reviews = [];

    if (roomName) {
        socket.join(roomName);
        reviews = await Review.find({bookId: roomName}).select('-_id author text');
    }

    if (reviews && reviews.length > 0) {
        socket.emit('review-list-to-book', reviews);
    }

    socket.on('disconnect', () => {
        console.log('socket disconnected:', id);
    });

    socket.on('review-to-book', (review) => {
        socket.to(roomName).emit('review-to-book', review);
        socket.emit('review-to-book', review);

        const newReview = new Review({
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

module.exports = onBookReviewsConnection;