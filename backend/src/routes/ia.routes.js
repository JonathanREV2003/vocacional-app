import express from 'express';
import { interviewChat, jobOpportunities } from '../controllers/ia.controllers.js';

const router = express.Router();

router.post('/interview/chat', interviewChat);

router.post('/job-opportunities', jobOpportunities);

export default router;