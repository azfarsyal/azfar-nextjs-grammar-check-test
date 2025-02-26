import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function generateToken(user) {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
}
