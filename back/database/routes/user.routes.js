import express from 'express';
import { authenticateAdmin } from '../../common/middleware/auth.middleware.js';
import { ban, get, mod, remove } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/get', authenticateAdmin, get);
router.delete('/delete', authenticateAdmin, remove);
router.post('/ban', authenticateAdmin, ban);
router.post('/mod', authenticateAdmin, mod);

export default router;
