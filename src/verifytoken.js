import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, 'seuSegredo');
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) return res.status(401).json({ message: 'Usuário não autorizado' });

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};
