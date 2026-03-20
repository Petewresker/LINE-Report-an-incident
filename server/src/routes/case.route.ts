import { Router } from 'express';
import { getUserCases } from '../controllers/case.controller';

const router = Router();

// GET /api/cases/user/:userId
router.get('/user/:userId', getUserCases);

export default router;
