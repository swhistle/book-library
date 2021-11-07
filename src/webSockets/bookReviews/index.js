const onBookReviewsConnection = async (io, socket) => {
    const {id} = socket;
    const {roomName} = socket.handshake.query;
    console.log('socket connected:', id, 'roomName', roomName);

    if (roomName) {
        socket.join(roomName);
    }

    socket.on('disconnect', () => {
        console.log('socket disconnected:', id);
    });

    socket.on('review-to-book', (review) => {
        socket.to(roomName).emit('review-to-book', review);
        socket.emit('review-to-book', review);
    });
};

module.exports = onBookReviewsConnection;