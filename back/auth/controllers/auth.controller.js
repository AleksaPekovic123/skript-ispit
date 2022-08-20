import bcrypt from 'bcrypt';
import User from '../../models/user.model.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) throw new Error('Username not found');
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error('Invalid password');
    if (user.isBanned) throw new Error('Account suspended');
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        userType: user.userType,
        banned: user.isBanned,
      },
      process.env.SECRET_KEY,
      { expiresIn: '3h' }
    );
    res.status(200).json(`Bearer ${token}`);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { userInfo } = req.body;
    const passHash = await bcrypt.hash(userInfo.password, 12);
    const user = new User({
      username: userInfo.username,
      password: passHash,
      email: userInfo.email,
    });
    await user.valid(userInfo);
    await user.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        userType: user.userType,
        banned: user.isBanned,
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(201).json(`Bearer ${token}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
