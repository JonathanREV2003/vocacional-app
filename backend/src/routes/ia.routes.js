import express from 'express';
import { interviewChat, jobOpportunities } from '../controllers/ia.controllers.js';

const router = express.Router();

// Ruta para chatbot de entrevistas
router.post('/interview/chat', interviewChat);

// Ruta para oportunidades laborales
router.get('/users/:userId/job-opportunities', jobOpportunities);

export default router;