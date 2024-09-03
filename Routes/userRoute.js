const express = require('express');
const router = express.Router(); // Use express.Router()
const multer=require('multer');
const userController = require('../Controllers/userController');

// Set up multer for handling file uploads

const storage = multer.diskStorage({ 
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// User routes

router.post('/register',upload.single('image'), userController.register);
router.post('/login', userController.Login);

module.exports = { Routes: router };
