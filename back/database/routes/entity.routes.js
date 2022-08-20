import express from 'express';
import {
  addEntity,
  checkLike,
  deleteOneEntity,
  getEntities,
  likeEntity,
  reviewEntity,
  searchEntities,
  updateOneEntity,
} from '../controllers/entity.controller.js';
import {
  authenticate,
  authenticateMod,
} from '../../common/middleware/auth.middleware.js';

const router = express.Router();

router.get('/get', getEntities);
router.get('/search', searchEntities);
router.patch('/update', authenticateMod, updateOneEntity);
router.delete('/delete', authenticateMod, deleteOneEntity);
router.post('/add', authenticateMod, addEntity);
router.patch('/review', authenticate, reviewEntity);
router.post('/like', authenticate, likeEntity);
router.post('/checkLike', authenticate, checkLike);

export default router;
