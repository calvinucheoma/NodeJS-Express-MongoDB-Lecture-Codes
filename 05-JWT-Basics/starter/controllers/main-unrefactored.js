const jwt = require('jsonwebtoken');
const CustomerAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomerAPIError('Please provide email and password', 400);
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
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomerAPIError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomerAPIError('Not authorized to access this route', 401);
  }

  //   console.log(token);
};

module.exports = { login, dashboard };
