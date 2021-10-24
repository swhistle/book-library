const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const isFileText = file.mimetype === 'text/plain';
    cb(null, isFileText);
}

module.exports = multer({storage, fileFilter});