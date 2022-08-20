import jwt from 'jsonwebtoken';
import { ADMIN, STANDARD } from '../enums/userTypes.js';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;

    if (!token) throw new Error('Authentication is missing');

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedData.isBanned)
      throw new Error('You have been banned by the administrator');

    req.locals = {
      userId: decodedData.id,
      userType: decodedData.userType,
      username: decodedData.username,
    };
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const authenticateAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Authentication is missing');

    const token = req.headers.authorization.split(' ')[1];

    if (!token) throw new Error('Authentication is missing');

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedData.isBanned)
      throw new Error('You have been banned by the administrator');

    if (decodedData.userType !== ADMIN) {
      res.status(403).json({ message: 'Not an administrator' });
      return;
    }

    req.locals = {
      userId: decodedData.id,
      userType: decodedData.userType,
      username: decodedData.username,
    };
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const authenticateMod = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Authentication is missing');

    const token = req.headers.authorization.split(' ')[1];

    if (!token) throw new Error('Authentication is missing');

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedData.isBanned)
      throw new Error('You have been banned by the administrator');

    if (decodedData.userType === STANDARD) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    req.locals = {
      userId: decodedData.id,
      userType: decodedData.userType,
      username: decodedData.username,
    };
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
