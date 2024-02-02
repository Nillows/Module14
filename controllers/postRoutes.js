// Import necessary modules and models
const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

// Route to get all posts
router.get('/', (req, res) => {
    // Retrieve all posts from the database
    Post.findAll()
        .then(databasePost => {
            // Respond with the retrieved posts in JSON format
            res.json(databasePost);
        })
        .catch(err => {
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).json({ msg: 'Server error!', err });
        });
});

// Route to get all posts owned by a given user
router.get('/userposts/:id', (req, res) => {
    Post.findAll({
        where: {
            postId: req.params.id
        }
    })
        .then(databasePost => {
            // Respond with the retrieved posts in JSON format
            res.json(databasePost);
        })
        .catch(err => {
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).json({ msg: 'Server error!', err });
        });
});

// Route to get a single post by its ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(databasePost => {
            if (databasePost) {
                // If the post is found, respond with it in JSON format
                res.json(databasePost);
            } else {
                // If the post is not found, send a 404 Not Found response
                res.status(404).json({ msg: 'Post not found' });
            }
        })
        .catch(err => {
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).json({ msg: 'Server error!', err });
        });
});

// Route to create a new post
router.post('/', (req, res) => {
    console.log(req.session.user.id);
    // Create a new post based on the provided data
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user.id
    })
        .then(databasePost => {
            // Respond with the newly created post in JSON format
            res.json(databasePost);
        })
        .catch(err => {
            // Handle errors and send a 500 Internal Server Error response
            res.status(500).json({ msg: 'Server error!', err });
        });
});

// Route to delete a post
router.delete('/:id', async (req, res) => {
    try {
        // Delete a post based on its ID
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deletedPost) {
            // If the post is deleted, respond with a 200 OK status
            res.status(200).json(deletedPost);
        } else {
            // If the post is not found, send a 404 Not Found response
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        // Handle errors and send a 500 Internal Server Error response
        res.status(500).json(err);
    }
});

// Route to update a post
router.put('/:id', async (req, res) => {
    try {
        // Update a post based on its ID and the provided data
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (updatedPost) {
            // If the post is updated, respond with a 200 OK status
            res.status(200).json(updatedPost);
        } else {
            // If the post is not found, send a 404 Not Found response
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        // Handle errors and send a 500 Internal Server Error response
        res.status(500).json(err);
    }
});

// Export the router for use in other parts of the application
module.exports = router;
