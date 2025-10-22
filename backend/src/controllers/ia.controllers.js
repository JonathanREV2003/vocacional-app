import { interviewChatbot, jobOpportunitiesBot } from '../services/ia.js';
import { getTopCareers } from '../models/test.model.js';

// Controlador para chatbot de entrevistas
export const interviewChat = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: 'ID de usuario y mensaje requeridos' });
    }

    // Obtener top 3 carreras del usuario
    const topCareers = await getTopCareers(userId);

    if (topCareers.length === 0) {
      return res.status(404).json({ message: 'No se encontraron carreras para este usuario' });
    }

    // Generar respuesta del chatbot
    const response = await interviewChatbot(topCareers, message);

    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Error en el chatbot', error: error.message });
  }
};

// Controlador para bot de oportunidades laborales
export const jobOpportunities = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }

    // Obtener top 3 carreras del usuario
    const topCareers = await getTopCareers(userId);

    if (topCareers.length === 0) {
      return res.status(404).json({ message: 'No se encontraron carreras para este usuario' });
    }

    // Generar información sobre oportunidades laborales
    const opportunities = await jobOpportunitiesBot([], topCareers);

    res.json({ opportunities });
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo oportunidades laborales', error: error.message });
  }
};