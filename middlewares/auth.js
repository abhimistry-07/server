const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.send({ msg: 'Please login' });
    }

    const decoded = jwt.verify(token, "secretPass");

    if (!decoded) {
        res.send({ msg: 'Please login' });
    }

    req.body.user = decoded.userId;
    req.body.name = decoded.name;

    // decoded.userId = UserId

    next();
}

module.exports = authenticate;