import { useState, useEffect } from 'react';
import { FiArrowLeft, FiMessageCircle, FiSend } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function InterviewChat() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const careerName = searchParams.get('career');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [usedQuestions, setUsedQuestions] = useState(new Set());

  const fixedQuestions = [
    `¿Cómo me preparo para una entrevista en ${careerName}?`,
    `¿Qué preguntas comunes me harán en una entrevista para ${careerName}?`,
    `¿Qué habilidades debo destacar para ${careerName}?`
  ];

  useEffect(() => {
    if (!careerName) {
      navigate('/dashboard');
    }
  }, [careerName, navigate]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setUsedQuestions(prev => new Set([...prev, message]));

    try {
      const response = await fetch('http://localhost:4000/api/ia/interview/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          careerName,
          userMessage: message
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

  const handleSend = () => {
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-black grid-pattern flex flex-col">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-gray-800 p-3 sm:p-4 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white mr-3 sm:mr-4"
        >
          <FiArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <FiMessageCircle size={20} className="sm:w-6 sm:h-6 text-[#e99b63]" />
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">Entrevista Simulada - {careerName}</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-6 sm:mt-8">
            <FiMessageCircle size={40} className="sm:w-12 sm:h-12 mx-auto mb-4" />
            <p className="text-sm sm:text-base">Selecciona una pregunta para comenzar o escribe tu mensaje.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
              msg.type === 'user'
                ? 'bg-[#e99b63] text-white'
                : 'bg-[#0a0a0a] border border-gray-800 text-white'
            }`}>
              <p style={{ whiteSpace: 'pre-wrap' }} className="text-sm sm:text-base">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#0a0a0a] border border-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg">
              <p className="text-sm sm:text-base">Procesando...</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Questions */}
      <div className="p-3 sm:p-4 bg-[#0a0a0a] border-t border-gray-800">
        <div className="space-y-2 mb-3 sm:mb-4">
          {fixedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => sendMessage(question)}
              disabled={loading || usedQuestions.has(question)}
              className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                usedQuestions.has(question)
                  ? 'bg-gray-600/50 border border-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-black/50 border border-gray-800 hover:border-[#e99b63] hover:bg-gray-800/30'
              }`}
            >
              <span className={usedQuestions.has(question) ? 'text-gray-400' : 'text-white'}>{question}</span>
            </button>
          ))}
        </div>

        {/* Direct Message Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta..."
            className="flex-1 p-2 sm:p-3 bg-black/50 border border-gray-800 rounded-lg text-white focus:ring-2 focus:ring-[#e99b63] focus:border-transparent outline-none text-sm sm:text-base"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !inputMessage.trim()}
            className="bg-gradient-to-r from-[#656565] to-[#e99b63] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:shadow-[0_0_15px_rgba(233,155,99,0.5)] transition-all duration-200 disabled:opacity-50"
          >
            <FiSend size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}