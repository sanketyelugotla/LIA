const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Blog description is required'],
        },
        url: {
            type: String,
        },
        image: {
            type: String,
            required: [true, 'Blog image is required'],
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Blog must have an author'],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model('Blog', blogSchema);
