const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10); //10 indicates how many random bytes we want to generate. The more rounds we have, the more processor power it's going to require although more rounds means more secure but 10 is a very good and common value
  const hashPaassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashPaassword };

  //   if (!name || !password || !email) {
  //     throw new BadRequestError('Please provide name, email and password');
  //   } //if we want to check for errors directly from the controller. In our case, we'll check using Mongo

  const user = await User.create({ ...tempUser });

  const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  });

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }); //CREATED is a 201 status response that creates a resource
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
