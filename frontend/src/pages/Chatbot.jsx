import { useState, useEffect } from 'react';
import { FiArrowLeft, FiMessageCircle, FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getResults } from '../services/resultService';

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topCareers, setTopCareers] = useState([]);

  const fixedQuestions = [
    "¿Cuáles son mis top 10 posibles oportunidades laborales?",
    "¿Qué carreras me recomiendas basadas en mis resultados?",
    "¿Cómo puedo aplicar mis habilidades en el mercado laboral?"
  ];

  useEffect(() => {
    const results = getResults();
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      if (latestResult.topCareers) {
        // Assign fixed scores: 100, 85, 75
        const fixedTopCareers = latestResult.topCareers.map((career, index) => ({
          ...career,
          score: [100, 85, 75][index] || 75
        }));
        setTopCareers(fixedTopCareers);
      }
    }
  }, []);

  const sendMessage = async (question) => {
    if (topCareers.length === 0) {
      setMessages(prev => [...prev, { type: 'bot', text: 'No hay resultados de test disponibles. Complete el test primero.' }]);
      return;
    }

    setLoading(true);
    setMessages(prev => [...prev, { type: 'user', text: question }]);

    try {
      const response = await fetch('http://localhost:4000/api/ia/job-opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topCareers,
          userMessage: "Quiero conocer mis 10 posibles oportunidades laborales en Guatemala basadas en mis carreras top."
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.message || 'Respuesta del bot: ' + JSON.stringify(data) }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Error al conectar con el servidor. Intente de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black grid-pattern flex flex-col">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-gray-800 p-4 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white mr-4"
        >
          <FiArrowLeft size={24} />
        </button>
        <div className="flex items-center space-x-2">
          <FiMessageCircle size={24} className="text-[#e99b63]" />
          <h1 className="text-xl font-bold text-white">ChatBot Vocacional</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <FiMessageCircle size={48} className="mx-auto mb-4" />
            <p>Selecciona una pregunta para comenzar.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.type === 'user'
                ? 'bg-[#e99b63] text-white'
                : 'bg-[#0a0a0a] border border-gray-800 text-white'
            }`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#0a0a0a] border border-gray-800 text-white px-4 py-2 rounded-lg">
              <p>Procesando...</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Questions */}
      <div className="p-4 bg-[#0a0a0a] border-t border-gray-800">
        <div className="space-y-2">
          {fixedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => sendMessage(question)}
              disabled={loading}
              className="w-full text-left p-3 bg-black/50 border border-gray-800 rounded-lg hover:border-[#e99b63] hover:bg-gray-800/30 transition-all duration-200 disabled:opacity-50"
            >
              <span className="text-white">{question}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}