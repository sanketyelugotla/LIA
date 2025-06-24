const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { checkRole } = require('../middleware/role');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

// Protected routes (require authentication)
router.use(require('../middleware/auth'));

// Role-based routes
router.post('/', checkRole(['admin', 'user']), blogController.createBlog);
router.patch('/:id', checkRole(['admin', 'user']), blogController.updateBlog);
router.delete('/:id', checkRole(['admin']), blogController.deleteBlog);

module.exports = router;