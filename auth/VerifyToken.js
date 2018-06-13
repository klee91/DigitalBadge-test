const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next, token) => {
  let tokenFromHeader = req.headers['x-access-token'];
  console.log(tokenFromHeader);
  if (!tokenFromHeader)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(tokenFromHeader, config.OREO, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;