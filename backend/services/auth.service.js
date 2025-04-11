import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const verifyPassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
export const generateToken = (payload) => {
  return jwt.sign(payload, 'holi', { expiresIn: '2h' });
}

