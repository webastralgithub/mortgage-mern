const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const db = require('../config/db')

// User registration
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new user with the specified role
    const user = await Role.create({ name});

    res.json({ message: 'Role created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Role creation  failed' });
  }
};
exports.get = async ( req,res) => {
    try {
    
  
      // Create a new user with the specified role
      const role = await Role.findAll();
  
      res.json({roles:role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Role fetch  failed' });
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
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
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
    const { username, password, role } = req.body;

    // You may want to add role validation logic here to ensure only admin can create users
    // Example: if (req.user.role !== 'admin') { return res.status(403).json({ error: 'Permission denied' }); }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the specified role
    const user = await User.create({ username, password: hashedPassword, role,email,phone });

    res.json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User creation failed' });
  }
};
