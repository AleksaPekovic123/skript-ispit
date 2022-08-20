import Joi from 'joi';
import { REVIEWABLE_ENTITIES } from '../common/enums/entityTypes.js';
import mongoose from 'mongoose';

const review = mongoose.Schema({
  entityId: { type: String, required: true },
  entityType: { type: String, required: true },
  userId: { type: String, required: true },
  username: { type: String, required: false },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

review.methods.valid = async function (reviewInfo) {
  const schema = Joi.object().keys({
    entityId: Joi.string().min(24).max(24).required(),
    entityType: Joi.string().required(),
    userId: Joi.string().min(24).max(24).required(),
    comment: Joi.string().max(255).required(),
    rating: Joi.number().integer().min(1).max(10).required(),
    username: Joi.string(),
  });
  const validate = schema.validate(reviewInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);
  if (!REVIEWABLE_ENTITIES.includes(reviewInfo.entityType))
    throw new Error('Invalid entity type');
  const existingReview = await Review.findOne({
    entityId: reviewInfo.entityId,
    userId: reviewInfo.userId,
  });
  if (existingReview)
    throw new Error(
      `You have already reviewed this ${reviewInfo.entityType.toLowerCase()}`
    );
};

review.methods.validUpdate = function (reviewInfo) {
  if (!reviewInfo) throw new Error('Nothing to update');
  const schema = Joi.object().keys({
    comment: Joi.string().max(255),
    rating: Joi.number().integer().min(1).max(10),
  });
  const validate = schema.validate(reviewInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);
};

const Review = mongoose.model('Review', review);

export default Review;
