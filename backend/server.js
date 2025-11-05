const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection with error handling
const { connectDB } = require('./config/database');
connectDB().catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1);
});

// Routes with error handling
try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/projects', require('./routes/projects'));
    app.use('/api/analytics', require('./routes/analytics'));
    app.use('/api/finance', require('./routes/finance'));
    app.use('/api/audit', require('./routes/audit').router);
} catch (error) {
    console.error('Error loading routes:', error);
    process.exit(1);
}

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Dashboard route with EJS
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Green City Dashboard',
        user: req.user || null
    });
});

// Projects route with EJS
app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Green Projects',
        user: req.user || null
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Green City server running on port ${PORT}`);
    console.log(`📊 Using MongoDB for data storage`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});