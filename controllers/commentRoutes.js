// Import necessary modules and models
const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');

// Create a new comment
router.post('/', (req, res) => {
    // Find the user by their ID from the session
    User.findByPk(req.session.user.id, { attributes: ['id', 'username'] })
        .then(user => {
            // Create a new comment associated with the user and post
            return Comment.create({
                contents: req.body.contents,
                user_id: req.session.user.id,
                post_id: req.body.postId
            });
        })
        .then(newComment => {
            // Log the newly created comment and respond with it in JSON format
            console.log('new comment:', newComment.toJSON())
            res.json(newComment);
        })
        .catch(err => {
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).json({ msg: 'Server error!', err });
        });
});

// Get all comments for a given post
router.get('/onpost/:id', (req, res) => {
    // Find all comments for the specified post, including the username of the user who made each comment
    Comment.findAll({
        where: {
            post_id: req.params.id
        },
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbComment => {
            // Respond with the retrieved comments in JSON format
            res.json(dbComment);
        })
        .catch(err => {
            // Handle errors, log the error, and send a 500 Internal Server Error response
            console.log('error creating comment', err)
            res.status(500).json({ msg: 'Server error!', err });
        });
});

// Export the router for use in other parts of the application
module.exports = router;
