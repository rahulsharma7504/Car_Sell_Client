const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const http = require('http');
const Server = http.createServer(app);
const { Io } = require('./config/Socket');
Io(Server);
const { connection } = require('./config/db');
const { cloudinary } = require('./config/cloudinary');

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // or '*' to allow all origins
    methods: 'GET,POST,PUT,DELETE', // allowed HTTP methods
    credentials: true // Allow credentials (cookies, headers)
  }));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Route Middleware
app.use('/api/users', require('./Routes/userRoute').Routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
