// Controlador para chatbot de entrevistas
export const interviewChat = async (req, res) => {
  try {
    const { careerName, userMessage } = req.body;

    if (!careerName || !userMessage) {
      return res.status(400).json({ message: 'careerName y userMessage son requeridos' });
    }

    // Construimos topCareers simulado de un solo ítem
    const topCareers = [{ name: careerName }];

    // Generar respuesta del chatbot
    const response = await interviewChatbot(topCareers, userMessage);

    res.json({ response });
  } catch (error) {
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

    const opportunities = await jobOpportunitiesBot(userMessage, topCareers);

    res.json({ opportunities });
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo oportunidades laborales', error: error.message });
  }
};