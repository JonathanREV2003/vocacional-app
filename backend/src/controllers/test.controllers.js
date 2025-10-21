const { getTestWithQuestions } = require('../models/test.model.js');

exports.getTests = async (req, res) => {
  try {
    const tests = await getTestWithQuestions();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo los tests', error });
  }
};
