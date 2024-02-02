// Import necessary modules and packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Imports the User model

// Route to create a new user
router.post('/', (req, res) => {
    // Create a new user with the provided username and hashed password
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(newUser => {
        // Store the user's ID in the session for authentication
        req.session.user = {
            id: newUser.id
        };
        // Respond with the newly created user in JSON format
        res.json(newUser);
    }).catch(err => {
        // Handle errors and send a 500 Internal Server Error response
        res.status(500).json({ msg: 'Server Error!', err });
    });
});

// Route for user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username // Find the user by their username
        }
    }).then(foundUser => {
        if (!foundUser) {
            // If the user is not found, send a 401 Unauthorized response
            return res.status(401).json({ message: 'Incorrect username or password!' });
        } else if (!foundUser.checkPassword(req.body.password)) {
            // If the password is incorrect, send a 401 Unauthorized response
            return res.status(401).json({ message: 'Incorrect username or password!' });
        }

        // Store the user's ID and username in the session for authentication
        req.session.user = {
            id: foundUser.id,
            username: foundUser.username
        };

        // Respond with the user's ID and username in JSON format
        res.json({ userId: req.session.user.id, username: req.session.user.username });
    }).catch(err => {
        // Handle errors and send a 500 Internal Server Error response
        res.status(500).json({ msg: 'Server error!', err });
    });
});

// Route for user logout
router.delete('/logout', (req, res) => {
    console.log('Session before destroy:', req.session);
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                // Error case: log the error and send a 500 Internal Server Error response
                console.error('Asynchronous session destruction occurred', err);
                res.status(500).json({ message: 'Error during logout' });
            } else {
                // Successful logout: clear the session cookie and send a 200 OK response
                res.clearCookie('connect.sid', { path: '/', maxAge: 0, expires: new Date(0) });
                console.log('Session after destroy:', req.session);
                res.status(200).json({ message: 'Logout Successful' });
            }
        });
    } else {
        // Session timeout case: send a 404 Not Found response
        res.status(404).json({ message: 'No active session found' });
    }
});

// Export the router for use in other parts of the application
module.exports = router;
