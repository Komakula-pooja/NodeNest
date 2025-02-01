const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../utils/validation');


const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const getUser = async (username = "", email = "") => {
  try {
    const user = await User.findOne({
      $or: [
        { username },
        { email },
      ],
    });
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};


const signupUser = async (user) => {
  try {
    validateUser(user);

    const existingUser = await getUser(user.username, user.email);
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = await User.create(user);
    return { success: 'User registered successfully', userId: newUser._id };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


const loginUser = async (user) => {
  try {
    const existingUser = await getUser(null, user.email);
    if (!existingUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }


    const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);
    if (!isPasswordValid) {
      const error = new Error('Incorrect password');
      error.statusCode = 401;
      throw error;
    }

    const token = generateAccessToken(existingUser._id);
    return { jwtToken: token };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

module.exports = { signupUser, loginUser, verifyToken, getUser };
