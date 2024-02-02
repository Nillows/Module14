// Import necessary modules and models
const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

// Route to render the home page
router.get('/', (req, res) => {
    // Retrieve all posts with associated usernames
    Post.findAll({
        include: [{
            model: User,
            attributes: ["username"]
        }]
    })
    .then(databasePost => {
        // Map posts to a format suitable for rendering with Handlebars
        const handlebarsPosts = databasePost.map((post) => post.toJSON());
        let isLoggedIn = false;

        // Check if the user is logged in
        if (req.session.user) {
            isLoggedIn = true;
        }

        console.log(isLoggedIn);
        
        // Render the 'home' template with data
        res.render('home', {
            loggedIn: isLoggedIn,
            posts: handlebarsPosts
        });
    });
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.user) {
        // If the user is already logged in, redirect to the dashboard
        res.redirect('/dashboard');
    } else {
        // Render the 'auth' template for login with relevant data
        res.render('auth', {
            isLogin: true,
            loggedIn: false
        });
    }
});

// Route to render the signup page
router.get('/signup', (req, res) => {
    if (req.session.user) {
        // If the user is already logged in, redirect to the dashboard
        res.redirect('/dashboard');
    } else {
        // Render the 'auth' template for signup with relevant data
        res.render('auth', {
            isLogin: false,
            loggedIn: false
        });
    }
});

// Route to render the user's dashboard
router.get('/dashboard', (req, res) => {
    console.log(req.session.user.id);

    // Retrieve posts authored by the user with associated usernames
    Post.findAll({
        where: {
            user_id: req.session.user.id
        },
        include: [{
            model: User,
            attributes: ["username"]
        }]
    })
    .then(databasePosts => {
        // Map posts to a format suitable for rendering with Handlebars
        const handlebarsPosts = databasePosts.map((post) => post.toJSON());

        // Check if there is an active session; if not, redirect to the home page
        if (!req.session.user) {
            res.redirect('/');
        } else {
            // Render the 'dashboard' template with data
            res.render('dashboard', {
                loggedIn: true,
                posts: handlebarsPosts
            });
        }
    });
});

// Route to render the page for creating a new post
router.get('/new_post', (req, res) => {
    if (!req.session.user) {
        // If the user is not logged in, redirect to the login page
        res.redirect('/login');
    } else {
        // Render the 'new_post' template with relevant data
        res.render('new_post', {
            isLogin: false,
            loggedIn: true
        });
    }
});

// Route to render a post and its associated comments
router.get('/post/:postId', (req, res) => {
    const postId = req.params.postId;

    // Find the post by its ID, including the associated usernames
    Post.findByPk(postId, {
        include: [{
            model: User,
            attributes: ["username"]
        }]
    })
    .then(post => {
        // Find all comments for the post, including the associated usernames
        Comment.findAll({
            where: {
                post_id: post.id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }]
        })
        .then(comments => {
            // Map comments and post data to a format suitable for rendering with Handlebars
            const handlebarsComments = comments.map((comment) => comment.toJSON());
            const handlebarsPost = post.toJSON();
            let loggedIn;

            // Check if there is an active session; set 'loggedIn' accordingly
            if (req.session.user) {
                loggedIn = true;
            } else {
                loggedIn = false;
            }

            // Render the 'comment' template with data
            res.render('comment', {
                loggedIn: loggedIn,
                post: handlebarsPost,
                comments: handlebarsComments
            });
        });
    });
});

// Export the router for use in other parts of the application
module.exports = router;
