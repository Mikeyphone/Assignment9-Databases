const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware for JSON payload parsing
app.use(express.json());

// Custom Log Catcher Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

//Data Collection
let resources = [
    { id: 1, name: "Test Task", status: "Pending" },
    { id: 2, name: "Code Structure Review", status: "Completed" }
];
let currentId = 3;

// 1. GET /api/resources — Return all elements
app.get('/api/resources', (req, res) => {
    res.status(200).json(resources);
});

// 2. GET /api/resources/:id — Return unique item or 404
app.get('/api/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = resources.find(r => r.id === id);
    
    if (!item) {
        return res.status(404).json({ error: "Resource not found." });
    }
    res.status(200).json(item);
});

// 3. POST /api/resources — Collect JSON, append ID, push to array
app.post('/api/resources', (req, res) => {
    const newItem = {
        id: currentId++,
        ...req.body
    };
    resources.push(newItem);
    res.status(201).json(newItem);
});

// 4. PUT /api/resources/:id — Overwrite properties for matching ID
app.put('/api/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = resources.findIndex(r => r.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "Resource not found for update." });
    }
    
    resources[index] = { ...resources[index], ...req.body, id };
    res.status(200).json(resources[index]);
});

// 5. DELETE /api/resources/:id — Target and splice out matching object
app.delete('/api/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = resources.findIndex(r => r.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "Resource not found for deletion." });
    }
    
    resources.splice(index, 1);
    res.status(200).json({ message: `Resource ${id} successfully deleted.` });
});

// Initialize server execution
app.listen(PORT, () => {
    console.log(`Server live and listening on http://localhost:${PORT}`);
});