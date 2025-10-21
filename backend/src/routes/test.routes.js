const  express = require ('express');
const { getTests } = require('../controllers/test.controllers.js');

const router = express.Router();

router.get('/tests', getTests);

module.exports = router;