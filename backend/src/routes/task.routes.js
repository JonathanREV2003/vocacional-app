import { Router } from 'express';
import { getAllLogin, postLogin, deleteLogin, putLogin } from '../controllers/task.controllers.js';

const router = Router();

router.get('/loginn', getAllLogin);

router.post('/loginn', postLogin);

router.delete('/loginn/:id', deleteLogin);

router.put('/loginn/:id', putLogin);

export default router;