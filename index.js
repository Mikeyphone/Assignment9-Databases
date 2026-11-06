const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(express.json());

// Custom Log Catcher Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

// MongoDB Connection (Local)
mongoose.connect('mongodb://127.0.0.1:27017/assignment9')
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema & Model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true }
});
const Item = mongoose.model('Item', itemSchema);

// 1. GET /api/items — Return all entries directly from database
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching items." });
    }
});

// 2. GET /api/items/:id — Target one item by database ID
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }
        res.status(200).json(item);
    } catch (err) {
        // A CastError usually means the ID format was invalid
        res.status(404).json({ error: "Item not found or invalid ID." });
    }
});

// 3. POST /api/items — Parse body, execute insert, return 201
app.post('/api/items', async (req, res) => {
    try {
        const newItem = await Item.create({
            name: req.body.name,
            status: req.body.status
        });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: "Invalid data submitted." });
    }
});

// 4. PUT /api/items/:id — Run update script for matching document
app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id, 
            { name: req.body.name, status: req.body.status },
            { new: true, runValidators: true } // new: true returns the updated document
        );
        
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found for update." });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: "Invalid data or ID." });
    }
});

// 5. DELETE /api/items/:id — Clear target entry permanently
app.delete('/api/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found for deletion." });
        }
        res.status(200).json({ message: "Item successfully deleted." });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format." });
    }
});

// Initialize server
app.listen(PORT, () => {
    console.log(`Server live and listening on http://localhost:${PORT}`);
});