const Blog = require('../models/Blog');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllBlogs = async (req, res, next) => {
    try {
        const features = new APIFeatures(
            Blog.find().populate('author', 'name'),
            req.query
        )
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const blogs = await features.query;

        res.status(200).json({
            status: 'success',
            results: blogs.length,
            data: {
                blogs,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getRecentBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .populate('author', 'name');

        if (!blogs || blogs.length === 0) {
            return next(new AppError('No blogs found', 404));
        }

        res.status(200).json({
            status: 'success',
            results: blogs.length,
            blogs,
        });
    } catch (err) {
        next(err);
    }
};

exports.getFeaturedBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ featured: true }).populate('author', 'name');
        console.log(blogs)

        if (!blogs || blogs.length === 0) {
            return next(new AppError('No featured blogs found', 404));
        }

        res.status(200).json({
            status: 'success',
            results: blogs.length,
            blogs,
        });
    } catch (err) {
        next(err);
    }
};

exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');

        if (!blog) {
            return next(new AppError('No blog found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                blog,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createBlog = async (req, res, next) => {
    try {
        const { title, content, description, url, image } = req.body;
        // const author = req.user.id;
        const author = '685ac90e1184fdafa269536f'

        const newBlog = await Blog.create({
            title,
            content,
            author,
            description, url, image
        });

        res.status(201).json({
            status: 'success',
            data: {
                blog: newBlog,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return next(new AppError('No blog found with that ID', 404));
        }

        // Check if the user is the author or admin
        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new AppError('You are not authorized to update this blog', 403));
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, updatedAt: Date.now() },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                blog: updatedBlog,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return next(new AppError('No blog found with that ID', 404));
        }

        // Only admin can delete any blog, author can delete their own
        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new AppError('You are not authorized to delete this blog', 403));
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};