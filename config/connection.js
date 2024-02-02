// Import the Sequelize ORM framework
const Sequelize = require('sequelize');
// Import the dotenv package to manage environment variables
require('dotenv').config();

// Declare a variable to hold the Sequelize connection instance
let sequelize;

// Check if the JAWSDB_URL environment variable is set
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is set, initialize Sequelize to connect to the JawsDB database using its URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set, initialize Sequelize for a different MySQL database using individual parameters
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name from the environment variable
    process.env.DB_USER, // Database user from the environment variable
    process.env.DB_PASSWORD, // Database password from the environment variable
    {
      host: process.env.DB_HOST || `localhost`, // Database host from the environment variable, defaults to `localhost` if not set
      dialect: 'mysql', // Specify the database dialect to be MySQL
      port: 3306 // Specify the port number for the database server
    }
  );
}

// Export the initialized Sequelize instance for use in other parts of the application
module.exports = sequelize;