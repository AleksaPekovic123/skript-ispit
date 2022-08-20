import { REVIEWABLE_ENTITIY_MODELS } from '../../common/enums/entityTypes.js';
import Review from '../../models/review.model.js';

export const getReviews = async (req, res) => {
  try {
    const { entityId } = req.query;
    const reviews = entityId
      ? await Review.find({ entityId })
      : await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const { reviewId, updateInfo } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) throw new Error('Invalid entity id');
    if (review.userId != req.locals.userId)
      throw new Error('Cannot edit other users reviews');
    review.validUpdate(updateInfo);
    const entity = await REVIEWABLE_ENTITIY_MODELS[
      `${review.entityType}`
    ].findById(review.entityId);
    if (updateInfo.rating) {
      const newRating =
        (entity.reviewCount * entity.rating -
          review.rating +
          updateInfo.rating) /
        entity.reviewCount;
      await REVIEWABLE_ENTITIY_MODELS[`${review.entityType}`].findByIdAndUpdate(
        review.entityId,
        { rating: newRating }
      );
    }
    res
      .status(200)
      .json(
        await Review.findByIdAndUpdate(review.id, updateInfo, { new: true })
      );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) throw new Error('Invalid review id');
    if (review.userId != req.locals.userId)
      throw new Error('Cannot delete other users reviews');
    const entity = await REVIEWABLE_ENTITIY_MODELS[
      `${review.entityType}`
    ].findById(review.entityId);
    const newRating =
      entity.reviewCount != 1
        ? (entity.reviewCount * entity.rating - review.rating) /
          (entity.reviewCount - 1)
        : 0;
    await REVIEWABLE_ENTITIY_MODELS[`${review.entityType}`].findByIdAndUpdate(
      entity.id,
      { rating: newRating, reviewCount: entity.reviewCount - 1 }
    );
    res.status(200).json('Success');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
