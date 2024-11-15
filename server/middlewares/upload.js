// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Set storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Store files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using timestamp
    }
});

const upload = multer({ storage: storage });

module.exports = { upload };
