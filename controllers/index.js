// Import necessary modules and packages
const express = require('express');
const router = express.Router();

// Import route modules for different parts of the application
const htmlRoutes = require('./htmlRoutes'); // HTML-related routes
const userRoutes = require('./userRoutes'); // User-related API routes
const postRoutes = require('./postRoutes'); // Post-related API routes
const commentRoutes = require('./commentRoutes'); // Comment-related API routes

// Define routes for various parts of the application
router.use('/', htmlRoutes); // HTML routes for general pages
router.use('/api/users', userRoutes); // User-related API routes
router.use('/api/posts', postRoutes); // Post-related API routes
router.use('/api/comments', commentRoutes); // Comment-related API routes

// Export the router for use in other parts of the application
module.exports = router;
