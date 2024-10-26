// habitBackend.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/habitTrackerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the habit schema and model
const habitSchema = new mongoose.Schema({
    name: String,
    description: String,
    reminderTime: String,
    startDate: String,
    frequency: String,
    category: String,
    notes: String,
    progress: Number,
    streak: Number,
    nextUpdate: String
});

const Habit = mongoose.model('Habit', habitSchema);

// Routes
app.get('/habits', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching habits' });
    }
});

app.post('/habits', async (req, res) => {
    try {
        const newHabit = new Habit(req.body);
        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        res.status(500).json({ message: 'Error adding habit' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
