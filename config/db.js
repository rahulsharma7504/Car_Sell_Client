const mysql = require('mysql2/promise');

// Create a connection pool to the database
const connection = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "car_sell", // Replace with your actual database name
});

// Test the database connection
(async () => {
  try {
    await connection.getConnection(); // Test if the connection works
    console.log('Connected to the MySQL database.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();

module.exports = { connection };
