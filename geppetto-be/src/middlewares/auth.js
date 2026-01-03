import _ from 'lodash';

import { verifyToken } from '#utils/jwt';
import { ForbiddenError } from '#errors/forbidden';
import { UnauthorizedError } from '#errors/unauthorized';

/**
 * Middleware to authorize specific roles
 * @param {string[]} allowedRoles - Array of roles like ['admin', 'user']
 */
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError();
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        throw new UnauthorizedError('Invalid or expired token.');
      }

      if (!_.isEmpty(allowedRoles) && !allowedRoles.includes(decoded.role)) {
        throw new ForbiddenError();
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};