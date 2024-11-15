const Car = require('../models/Car');
const path = require('path');
const fs = require('fs');

// Create a new car
const createCar = async (req, res) => {
    console.log(req.body);
    const { title, description, tags, userId } = req.body;
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    console.log(imagePaths);
    try {
        const car = new Car({ title, description, tags, images: imagePaths, userId });
    
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating car' });
    }
};

// Get all cars for a specific user
const getCarsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const cars = await Car.find({ userId });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars for user' });
    }
};

// Get a single car by its ID
const getCarById = async (req, res) => {
    const { carId } = req.params;
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car details' });
    }
};

// Delete a car by its ID
const deleteCar = async (req, res) => {
    const { carId } = req.params;
    try {
        const car = await Car.findByIdAndDelete(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // Remove associated image files
        car.images.forEach(imagePath => {
            const filePath = path.join(__dirname, '..', imagePath);
            fs.unlink(filePath, err => {
                if (err) console.error(`Error deleting file: ${filePath}`);
            });
        });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car' });
    }
};

// Update a car by its ID
const updateCar = async (req, res) => {
    const { carId } = req.params;
    const { title, description, tags } = req.body;
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // Update fields
        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;
        if (imagePaths.length) {
            // Remove old images
            car.images.forEach(imagePath => {
                const filePath = path.join(__dirname, '..', imagePath);
                fs.unlink(filePath, err => {
                    if (err) console.error(`Error deleting file: ${filePath}`);
                });
            });
            car.images = imagePaths;
        }
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car' });
    }
};

// Export all controller functions
module.exports = { createCar, getCarsByUser, getCarById, deleteCar, updateCar };
