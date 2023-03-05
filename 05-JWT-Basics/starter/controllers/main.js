const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  //just for demo, normally provided by DB
  const id = new Date().getDate();

  //try to keep payload small, better experience for user as more payload means sending more data which can be slow for someone with poor internet connection
  //we used a shore jwtSecret just for demo. In production, use long, complex and unguessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  //   console.log(username, password);

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  //   console.log(req.headers);
  //   console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });

  //   console.log(token);
};

module.exports = { login, dashboard };
