const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const user = { id: 1, mail: "test@mail.ru" };
    res.status(201);
    res.send(user);
});

module.exports = router;