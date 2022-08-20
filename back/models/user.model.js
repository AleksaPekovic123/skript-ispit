import mongoose from 'mongoose';
import { STANDARD } from '../common/enums/userTypes.js';
import Joi from 'joi';

const user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, default: STANDARD },
  isBanned: { type: Boolean, default: false },
});

user.methods.valid = async function (userInfo) {
  const schema = Joi.object().keys({
    username: Joi.string().min(5).required(),
    password: Joi.string()
      .min(8)
      .max(25)
      .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')).required(),
    email: Joi.string().email().required()
  });
  const validate = schema.validate(userInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);
  const existingUser = await User.findOne({username: userInfo.username});
  if (existingUser) throw new Error('Username already in use');
};

const User = mongoose.model('User', user);

export default User;
