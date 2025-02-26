const { connection } = require('../config/db');
const { cloudinary } = require('../config/cloudinary');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { username, email, password, role, address, phone, licenseNumber } = req.body;


    if (!username || !email || !password || !role) {
      return res.status(200).json({ message: 'All fields are required' });
    }

    const hashPassword = await bcrypt.hash(password, 10); // Changed salt rounds to a realistic number (10)

    // Check if user already exists
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Upload image if provided
    let image = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.url;
    }

    // Insert user into the users table
    const newUser = {
      username,
      email,
      password: hashPassword,
      role,
      image
    };

    const [userResult] = await connection.query('INSERT INTO users SET ?', newUser);

    if (role === 'dealer') {
      // Dealer-specific logic
      const newDealer = {
        user_id: userResult.insertId, // Get the newly created user ID
        license_number: licenseNumber,
        address,
        contact_number: phone
        // Add other fields as needed
      };

      // Insert dealer details into dealers table
      await connection.query('INSERT INTO dealers SET ?', newDealer);
      res.send('Dealer registered successfully!');
    } else {
      res.send('User registered successfully!');
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Fetch user from the database
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0]; // Retrieve the user from the result set

    // Check if user has a password
    if (!user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user account is active
    if (user.status !== 'active') {
      return res.status(401).json({ message: 'User account is not active' });
    }

    let userData = { user }; // Initialize user data with basic user info 

    // Check if the user is a dealer and fetch dealer-specific information
    if (user.role === 'dealer') {
      const [dealerRows] = await connection.query('SELECT * FROM dealers WHERE user_id = ?', [user.id]);
      userData = { user, dealer: dealerRows[0] }; // Merge dealer information
    }

    // Generate JWT token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send response with token and user details
    return res.status(200).json({ token, userData });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




const allUsers = async (req, res) => {
  try {
    const id = req.params;
    const [users] = await connection.query('SELECT * FROM users where id not in(?) ', [id]);
    return res.status(200).json({ users }); // Return all users as JSON response

  } catch (error) {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Server Error' });
    }


  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await connection.query('DELETE FROM users WHERE id =?', [id]);
    console.log(del)
    return res.status(200).json({ message: 'User deleted successfully!' }); // Return success message
  } catch (error) {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Server Error' });
    }


  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, status } = req.body;

    const update = await connection.query('UPDATE users SET username=?, email=?, status=? WHERE id =?', [username, email, status, id]);
    console.log(update)
    return res.status(200).json({ message: 'User updated successfully!' }); // Return success message
  } catch (error) {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Server Error' });
    }


  }
}

module.exports = {
  register,
  Login,
  allUsers,
  deleteUser,
  updateUser,
  forgotPassword,
  ResetPassword
};
