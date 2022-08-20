import Joi from 'joi';
import mongoose from 'mongoose';
import { LIKE, UNLIKE } from '../common/enums/entityActions.js';

const like = mongoose.Schema({
  entityId: { type: String, required: true },
  entityType: { type: String, required: true },
  userId: { type: String, required: true },
});

like.methods.valid = async function (likeInfo, action) {
  const schema = Joi.object().keys({
    entityId: Joi.string().min(24).max(24).required(),
    entityType: Joi.string().required(),
    userId: Joi.string().min(24).max(24).required(),
  });
  const validate = schema.validate(likeInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);
  const existingLike = await Like.findOne({
    entityId: likeInfo.entityId,
    userId: likeInfo.userId,
    entityType: likeInfo.entityType,
  });
  if (existingLike && action === LIKE)
    throw new Error(
      `You have already liked this ${likeInfo.entityType.toLowerCase()}`
    );
  if (!existingLike && action === UNLIKE) {
    throw new Error(
      `You have not liked this ${likeInfo.entityType.toLowerCase()}`
    );
  }
};

const Like = mongoose.model('Like', like);

export default Like;
