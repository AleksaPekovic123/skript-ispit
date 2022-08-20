import express from 'express';
import { authenticate } from '../../common/middleware/auth.middleware.js';
import {
  getReviews,
  editReview,
  deleteReview,
} from '../controllers/review.controller.js';

const router = express.Router();

router.get('/get', getReviews);
router.patch('/edit', authenticate, editReview);
router.delete('/delete', authenticate, deleteReview);

export default router;
