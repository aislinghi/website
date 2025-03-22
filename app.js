const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle appointment request submissions
app.post('/api/appointment', (req, res) => {
    const { name, email, phone, message } = req.body;
    
    // Here you would typically:
    // 1. Validate the input
    // 2. Save to a database
    // 3. Send confirmation email
    // 4. Send notification to staff
    
    // For now, we'll just send a success response
    res.json({
        success: true,
        message: 'Appointment request received. We will contact you shortly.'
    });
});

app.listen(port, () => {
    console.log(`Website running at http://localhost:${port}`);
}); 