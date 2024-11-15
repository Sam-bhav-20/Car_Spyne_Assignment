const express = require('express');
const { upload } = require('../middlewares/upload');
const { createCar, getCarsByUser, getCarById, deleteCar, updateCar } = require('../controllers/carController');
const router = express.Router();

router.post('/', upload.array('carImages', 10), createCar);
router.get('/user/:userId', getCarsByUser); // Fetch cars by user
router.get('/car/:carId', getCarById);     // Fetch car by ID
router.delete('/:carId', deleteCar);
router.put('/:carId', upload.array('carImages', 10), updateCar);

module.exports = router;
