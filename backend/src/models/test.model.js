import pool from './postgres.js';

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

// Guardar respuestas del usuario
export const saveUserResponses = async (userId, responses) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insertar respuestas
    for (const response of responses) {
      await client.query(
        'INSERT INTO user_responses (user_id, question_id, option_id) VALUES ($1, $2, $3)',
        [userId, response.question_id, response.option_id]
      );
    }

    await client.query('COMMIT');
    return { success: true };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Calcular puntuaciones por carrera basado en respuestas
export const calculateCareerScores = async (userId) => {
  const query = `
    SELECT
      c.id AS career_id,
      c.name AS career_name,
      c.description,
      COUNT(ur.id) AS score
    FROM careers c
    LEFT JOIN career_scores cs ON cs.career_id = c.id AND cs.user_id = $1
    LEFT JOIN user_responses ur ON ur.user_id = $1
    LEFT JOIN options o ON o.id = ur.option_id
    WHERE o.option_value = c.name::text OR cs.score > 0
    GROUP BY c.id, c.name, c.description
    ORDER BY score DESC
    LIMIT 3;
  `;

  const { rows } = await pool.query(query, [userId]);

  // Guardar o actualizar puntuaciones
  for (const row of rows) {
    await pool.query(
      `INSERT INTO career_scores (user_id, career_id, score)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, career_id)
       DO UPDATE SET score = EXCLUDED.score, created_at = CURRENT_TIMESTAMP`,
      [userId, row.career_id, row.score]
    );
  }

  return rows;
};

// Obtener top 3 carreras para un usuario
export const getTopCareers = async (userId) => {
  const query = `
    SELECT c.name, c.description, cs.score
    FROM career_scores cs
    JOIN careers c ON c.id = cs.career_id
    WHERE cs.user_id = $1
    ORDER BY cs.score DESC
    LIMIT 3;
  `;

  const { rows } = await pool.query(query, [userId]);
  return rows;
};

