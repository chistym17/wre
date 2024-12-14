import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export default function handler(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ 
      user: {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name
      } 
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
