const AppError = require('../utils/appError');

const roleHierarchy = {
    superadmin: ['superadmin', 'admin', 'editor', 'user'],
    admin: ['admin', 'editor', 'user'],
    editor: ['editor', 'user'],
    user: ['user']
  };

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};

const checkRole = (allowedRoles, useHierarchy = true) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError('Authentication required', 401));
        }

        const userRole = req.user.role;

        // If using hierarchy, check if user's role includes the required role
        if (useHierarchy && roleHierarchy[userRole]) {
            const hasPermission = allowedRoles.some(role =>
                roleHierarchy[userRole].includes(role)
            );

            if (hasPermission) return next();
        }
        // Simple role check without hierarchy
        else if (allowedRoles.includes(userRole)) {
            return next();
        }

        return next(new AppError('Insufficient permissions', 403));
    };
};
  
// Alternative implementation that works with array of roles
const checkRoles = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError('Authentication required', 401));
        }

        if (!requiredRoles.includes(req.user.role)) {
            return next(new AppError('Insufficient permissions', 403));
        }

        next();
    };
};

// Higher-order function for specific role checks
const requireAdmin = () => checkRole('admin');
const requireUserOrAdmin = () => checkRole('user', 'admin');

module.exports = {
    restrictTo,
    checkRole,
    checkRoles,
    requireAdmin,
    requireUserOrAdmin,
};