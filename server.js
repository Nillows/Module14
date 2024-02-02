// Require necessary packages and modules
const sequelize = require('./config/connection'); // Import Sequelize connection
const express = require('express'); // Import Express.js
const exphbs = require('express-handlebars'); // Import Handlebars template engine
const allRoutes = require('./controllers'); // Import application routes
const session = require('express-session'); // Import Express session handling

const SequelizeStore = require('connect-session-sequelize')(session.Store); // Create a Sequelize session store

// Create an Express application instance
const app = express();

// Set the PORT for the application, defaulting to 3000 if not provided
const PORT = process.env.PORT || 3000;

// Define the session configuration
const sess = {
    secret: process.env.SESSION_SECRET, // Secret for session encryption (should be kept secret)
    cookie: {
        maxAge: 1000 * 60 * 60 * 1, // Session duration in milliseconds (1 hour)
    },
    resave: false, // Do not save the session if it has not changed
    saveUninitialized: true, // Save uninitialized sessions
    store: new SequelizeStore({
        db: sequelize, // Use the Sequelize connection for session storage
    }),
};

// Use the session middleware with the defined configuration
app.use(session(sess));

// Set up middleware to parse request data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create an instance of the Handlebars template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the defined routes from 'allRoutes'
app.use('/', allRoutes);

// Synchronize Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});
