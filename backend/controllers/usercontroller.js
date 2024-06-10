const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const createToken = (_id, userType) => {
  return jwt.sign({ _id, userType }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  console.log("Login request body:", req.body); // Debugging log

  try {
    const user = await User.login(email, password, userType);

    // create a token
    const token = createToken(user._id, user.userType);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  console.log("Signup request body:", req.body); // Debugging log

  try {
    const user = await User.signup(userType, email, password); // Note the order of parameters

    // create a token
    const token = createToken(user._id, user.userType);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
