import pool from '../models/postgres.js';

// Obtener test con sus preguntas y opciones
export const getTestWithQuestions = async () => {
  const query = `
    SELECT 
      t.id AS test_id, t.title AS test_title, t.description,
      q.id AS question_id, q.question_text,
      o.id AS option_id, o.option_text, o.option_value
    FROM tests t
    LEFT JOIN questions q ON q.test_id = t.id
    LEFT JOIN options o ON o.question_id = q.id
    ORDER BY t.id, q.id, o.id;
  `;

  const { rows } = await pool.query(query);

  // Convertimos en formato JSON estructurado
  const tests = [];
  let currentTest = null;
  let currentQuestion = null;

  rows.forEach(row => {
    // Si cambia el test
    if (!currentTest || currentTest.id !== row.test_id) {
      currentTest = {
        id: row.test_id,
        title: row.test_title,
        description: row.description,
        questions: []
      };
      tests.push(currentTest);
    }

    // Si cambia la pregunta
    if (!currentQuestion || currentQuestion.id !== row.question_id) {
      currentQuestion = {
        id: row.question_id,
        question_text: row.question_text,
        options: []
      };
      currentTest.questions.push(currentQuestion);
    }

    // Agregar opción si existe
    if (row.option_id) {
      currentQuestion.options.push({
        id: row.option_id,
        option_value: row.option_value,
        option_text: row.option_text
      });
    }
  });

  return tests;
};

