const User = require('../models/User');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllUsers = async (req, res, next) => {
    try {
        const features = new APIFeatures(User.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const users = await features.query.select('-password');

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return next(new AppError('No user found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        // Filter out unwanted fields that should not be updated
        const filteredBody = {};
        if (req.body.name) filteredBody.name = req.body.name;
        if (req.body.email) filteredBody.email = req.body.email;
        if (req.body.role) filteredBody.role = req.body.role;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!updatedUser) {
            return next(new AppError('No user found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(new AppError('No user found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};