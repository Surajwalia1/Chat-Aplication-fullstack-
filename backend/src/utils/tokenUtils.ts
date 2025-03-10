import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};
