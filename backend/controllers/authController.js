const jwt = require('jsonwebtoken');
const User = require('../models/User'); // assuming Mongoose
const AppError = require('../utils/appError');

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(new AppError('Email already in use', 400));

        const newUser = await User.create({ name, email, password, role: role || 'user' });

        const token = signToken(newUser._id, newUser.role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            user: newUser
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        const token = signToken(user._id, user.role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        user.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            user,
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
};

exports.verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
