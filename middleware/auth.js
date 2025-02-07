const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from the header
  const token = req.header('x-auth-token');

  //check if there is a token
  if (!token) {
    return res.status(401).json({ msg: 'Authentication denied' });
  }

  //Verify token
  // try {
  //   const decoded = jwt.verify(token, config.get('jwtSecert'));
  //   req.User = decoded.user;
  //   next();
  // } catch (err) {
  //   res.status(401).json({ msg: 'Not a vaild token' });
  // }
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
