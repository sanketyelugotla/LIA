const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    signToken,
    verifyToken,
};