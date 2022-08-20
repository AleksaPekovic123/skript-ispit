import { REVIEWABLE_ENTITIY_MODELS } from '../../common/enums/entityTypes.js';
import Review from '../../models/review.model.js';
import { LIKE, likeAction, UNLIKE } from '../../common/enums/entityActions.js';
import Like from '../../models/like.model.js';

export const getEntities = async (req, res) => {
  try {
    const { entityType, entityId } = req.query;
    if (!REVIEWABLE_ENTITIY_MODELS[`${entityType}`])
      throw new Error('Invalid entity');
    const entities = entityId
      ? await REVIEWABLE_ENTITIY_MODELS[`${entityType}`].findById(entityId)
      : await REVIEWABLE_ENTITIY_MODELS[`${entityType}`].find();
    if (!entities) throw new Error('Invalid entity id');
    res.status(200).json(entities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchEntities = async (req, res) => {
  try {
    const { entityType, searchText } = req.query;
    if (!REVIEWABLE_ENTITIY_MODELS[`${entityType}`])
      throw new Error('Invalid entity');
    const entities = await REVIEWABLE_ENTITIY_MODELS[`${entityType}`].find({
      title: { $regex: `${searchText}`, $options: 'i' },
    });
    res.status(200).json(entities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOneEntity = async (req, res) => {
  try {
    const { entityType, entityId } = req.body;
    await deleteReviewsAndLikes(entityId);
    if (!REVIEWABLE_ENTITIY_MODELS[`${entityType}`])
      throw new Error('Invalid entity');
    const entity = await REVIEWABLE_ENTITIY_MODELS[
      `${entityType}`
    ].findByIdAndDelete(entityId);
    if (!entity) throw new Error('Invalid entity id');
    res.status(200).json(entity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOneEntity = async (req, res) => {
  try {
    const { entityType, entityId, updateInfo } = req.body;
    const model = REVIEWABLE_ENTITIY_MODELS[`${entityType}`];
    if (!model) throw new Error('Invalid entity');
    const entity = await model.findById(entityId);
    if (!entity) throw new Error('Invalid entity id');
    await new model().valid(updateInfo, true);
    res
      .status(200)
      .json(await model.findByIdAndUpdate(entityId, updateInfo, { new: true }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addEntity = async (req, res) => {
  try {
    const { entityType, entityInfo } = req.body;
    const model = REVIEWABLE_ENTITIY_MODELS[`${entityType}`];
    if (!model) throw new Error('Invalid entity');
    const newEntity = new model(entityInfo);
    await newEntity.valid(entityInfo, false);
    newEntity.save();
    res.status(200).json(newEntity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const reviewEntity = async (req, res) => {
  try {
    const { entityId, entityType, comment, rating } = req.body;
    const { username, userId } = req.locals;
    const reviewInfo = {
      entityType: entityType,
      entityId: entityId,
      userId: userId,
      username: username,
      comment: comment,
      rating: rating,
    };
    await new Review().valid(reviewInfo);
    const review = new Review(reviewInfo);
    const entity = await REVIEWABLE_ENTITIY_MODELS[`${entityType}`].findById(
      entityId
    );
    if (!entity) throw new Error('Invalid entity id');
    const newRating =
      (entity.reviewCount * entity.rating + review.rating) /
      (entity.reviewCount + 1);
    await review.save();
    res.status(200).json(
      await REVIEWABLE_ENTITIY_MODELS[`${entityType}`].findByIdAndUpdate(
        entityId,
        {
          rating: newRating,
          reviewCount: entity.reviewCount + 1,
        },
        { new: true }
      )
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likeEntity = async (req, res) => {
  try {
    const { action, entityId, entityType } = req.body;
    const { userId } = req.locals;
    const model = REVIEWABLE_ENTITIY_MODELS[`${entityType}`];
    if (!model) throw new Error('Invalid entity type');
    const entity = await model.findById(entityId);
    if (!entity) throw new Error('Invalid entity id');
    const likeInfo = {
      entityId: entityId,
      entityType: entityType,
      userId: userId,
    };
    await new Like().valid(likeInfo, action);
    if (action === LIKE) {
      const like = new Like(likeInfo);
      await like.save();
      res.status(200).json(
        await model.findByIdAndUpdate(
          entity.id,
          {
            likeCount: entity.likeCount + 1,
          },
          { new: true }
        )
      );
    } else if (action === UNLIKE) {
      const like = await Like.findOneAndDelete({
        entityId,
        userId,
      });
      res.status(200).json(
        await model.findByIdAndUpdate(
          entity.id,
          {
            likeCount: entity.likeCount - 1,
          },
          { new: true }
        )
      );
      return;
    } else {
      throw new Error('Invalid action');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const checkLike = async (req, res) => {
  try {
    const { userId } = req.locals;
    const { entityId } = req.query;
    const like = await Like.findOne({ userId, entityId });
    res.status(200).json({ liked: like ? true : false });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReviewsAndLikes = async (entityId) => {
  try {
    const reviews = await Review.find({ entityId: entityId });
    const likes = await Like.find({ entityId: entityId });
    reviews.forEach(async (review) => {
      await Review.findByIdAndDelete(review.id);
    });
    likes.forEach(async (like) => {
      await Like.findByIdAndDelete(like.id);
    });
  } catch (error) {
    throw new Error('Error while deleting entity reviews and likes');
  }
};
