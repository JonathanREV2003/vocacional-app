const { Router } = require('express');
const { getAllLogin, postLogin, deleteLogin, putLogin } = require('../controllers/task.controllers');


const router = Router();

router.get('/loginn', getAllLogin)

router.post('/loginn', postLogin)

router.delete('/loginn/:id', deleteLogin)

router.put('/loginn/:id', putLogin)

module.exports = router;