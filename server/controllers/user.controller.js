const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require('../config/db')

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password, role,email,phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the specified role
    const user = await User.create({ username, password: hashedPassword, role,email,phone });

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and send a JWT token upon successful login
    const token = jwt.sign({ userId: user.id,role:user.role }, 'your-secret-key', {
      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Create user (admin-only)
exports.createUser = async (req, res) => {
  try {
    const { username, password, role, email, phone } = req.body;

    // You may want to add role validation logic here to ensure only admin can create users
    // Example: if (req.user.role !== 'admin') { return res.status(403).json({ error: 'Permission denied' }); }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the specified role
    const user = await User.create({ username, password: hashedPassword, role, email, phone});

    res.json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User creation failed' });
  }
};
// Get all users (admin-only)
exports.getAllUsers = async (req, res) => {
  try {
    // Check if the user making the request has the "admin" role

    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Fetch all users from the database
    const users = await User.findAll();

    // Return the list of users (excluding their passwords)
    const userArray = users.map((user) => {
      const { id, username, role,email,phone } = user;
      return { id, username, role,email,phone };
    });

    res.json(userArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};
