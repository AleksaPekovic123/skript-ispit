import { banActions, modActions } from '../../common/enums/userActions.js';
import User from '../../models/user.model.js';

export const get = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = userId ? await User.findById(userId) : await User.find();
    if (!users) throw new Error('Invalid user id');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { userId } = req.body;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error('Invalid user Id');
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const ban = async (req, res) => {
  try {
    const { action, userId } = req.body;
    const isBanned = banActions(action);
    const user = await User.findByIdAndUpdate(
      userId,
      { isBanned: isBanned },
      { new: true }
    );
    if (!user) throw new Error('Invalid user Id');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const mod = async (req, res) => {
  try {
    const { action, userId } = req.body;
    const userType = modActions(action);
    const user = await User.findByIdAndUpdate(
      userId,
      { userType: userType },
      { new: true }
    );
    if (!user) throw new Error('Invalid user Id');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
