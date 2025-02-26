import { verifyToken } from '@/utils/auth';

export default function authMiddleware(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: Authentication token not provided' });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(403).json({ message: 'Forbidden Access: Invalid token provided' });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res
        .status(500)
        .json({ message: 'Internal Server Error while authentication' });
    }
  };
}
