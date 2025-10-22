import express from 'express';
import { getTests, submitTest, getUserTopCareers } from '../controllers/test.controllers.js';

const router = express.Router();

router.get('/tests', getTests);
router.post('/tests/submit', submitTest);
router.get('/users/:userId/top-careers', getUserTopCareers);

export default router;