const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === 'john') {
    req.user = { name: 'John', id: 77 };
    next();
  } else {
    res.status(401).send('unautorized');
  }
};

module.exports = authorize;
