import { getTestWithQuestions, saveUserResponses, calculateCareerScores, getTopCareers } from '../models/test.model.js';

export const getTests = async (req, res) => {
  try {
    const tests = await getTestWithQuestions();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo los tests', error });
  }
};

// Guardar respuestas del usuario y calcular puntuaciones
export const submitTest = async (req, res) => {
  try {
    const { userId, responses } = req.body;

    if (!userId || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    // Guardar respuestas
    await saveUserResponses(userId, responses);

    // Calcular puntuaciones
    const scores = await calculateCareerScores(userId);

    res.json({
      message: 'Respuestas guardadas exitosamente',
      topCareers: scores
    });
  } catch (error) {
    res.status(500).json({ message: 'Error guardando respuestas', error: error.message });
  }
};

// Obtener top 3 carreras para un usuario
export const getUserTopCareers = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }

    const topCareers = await getTopCareers(userId);
    res.json(topCareers);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo carreras', error: error.message });
  }
};
