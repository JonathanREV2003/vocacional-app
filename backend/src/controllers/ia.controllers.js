import { interviewChatbot, jobOpportunitiesBot } from '../services/ia.js';

// Controlador para chatbot de entrevistas
export const interviewChat = async (req, res) => {
  try {
    const { careerName, userMessage } = req.body;

    if (!careerName || !userMessage) {
      return res.status(400).json({ message: 'careerName y userMessage son requeridos' });
    }

    console.log('Calling interviewChatbot with:', { careerName, userMessage });
    // Generar respuesta del chatbot
    const response = await interviewChatbot(careerName, userMessage);

    res.json({ message: response });
  } catch (error) {
    console.error('Error in interviewChat:', error);
    res.status(500).json({ message: 'Error en el chatbot', error: error.message });
  }
};

// Controlador para bot de oportunidades laborales
export const jobOpportunities = async (req, res) => {
  try {
    const { topCareers, userMessage } = req.body;

    if (!topCareers || topCareers.length === 0) {
      return res.status(400).json({ message: 'Se requiere un arreglo de topCareers' });
    }

    console.log('Calling jobOpportunitiesBot with:', { topCareers, userMessage });
    const opportunities = await jobOpportunitiesBot(topCareers, userMessage);

    res.json({ message: opportunities });
  } catch (error) {
    console.error('Error in jobOpportunities:', error);
    res.status(500).json({ message: 'Error obteniendo oportunidades laborales', error: error.message });
  }
};