const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/role');
const blogController = require('../controllers/blogControlller')
// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlog)
router.get('/recent', blogController.getRecentBlogs)
router.get('/popular', blogController.getPopularBlogs)
router.get('/:id', blogController.getBlog);

// Protected routes (require authentication)
router.post('/', blogController.createBlog);
router.use(require('../middleware/auth'));

// Role-based routes
router.patch('/:id', checkRole(['admin', 'user']), blogController.updateBlog);
router.delete('/:id', checkRole(['admin']), blogController.deleteBlog);

module.exports = router;