import verifyToken from './auth.middleware.js';
export const requireAdmin = verifyToken;
