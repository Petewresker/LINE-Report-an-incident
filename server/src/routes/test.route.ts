import express from 'express';
import { getDataTest } from '../controllers/test.controller';
import { dataEmptyCheck } from '../middlewares/emptyBodyCheck.middleware';

const router = express.Router();

router.get('/', dataEmptyCheck, getDataTest);

export default router;
