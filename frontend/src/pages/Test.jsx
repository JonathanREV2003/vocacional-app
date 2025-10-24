import { useState, useEffect } from 'react';
import { FiCheckCircle, FiArrowLeft, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { fetchTests } from '../services/testService';
import { calculateResults } from '../utils/testUtils';
import { saveResult } from '../services/resultService';

export default function Test() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    const loadTests = async () => {
      try {
        const tests = await fetchTests();
        if (tests.length > 0) {
          const test = tests[0]; // Tomar el primer test disponible 1
          const formattedQuestions = test.questions.map(q => ({
            id: q.id,
            question: q.question_text,
            options: q.options.map(opt => ({
              text: opt.option_text,
              value: opt.option_value
            }))
          }));
          setQuestions(formattedQuestions);
        }
      } catch (err) {
        setError('Error al cargar las preguntas. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    // Avanzar a la siguiente pregunta automáticamente
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Mostrar resultados cuando termine
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };


  if (showResults) {
    const result = calculateResults(answers);
    if (!resultSaved) {
      saveResult(result);
      setResultSaved(true);
    }
    return (
      <div className="min-h-screen bg-black grid-pattern flex flex-col p-4">
        {/* Header con logo y robot */}
        <div className="w-full flex justify-center py-4 mb-4">
          <div className="flex items-center space-x-2">
            {/* Robot 3D pequeño */}
            <div className="w-20 h-16 flex-shrink-0 overflow-hidden -ml-2">
              <div className="w-64 h-64 -mt-24 -ml-24 scale-50">
                <Spline
                  className="w-full h-full"
                  scene="https://prod.spline.design/KFfQUE95SIab8qAr/scene.splinecode"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#e99b63] to-[#ff8c42] bg-clip-text text-transparent whitespace-nowrap">
              VocacionalApp
            </h1>
          </div>
        </div>

        <div className="max-w-3xl w-full mx-auto bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#656565] to-[#e99b63] rounded-full mb-4">
              <FiCheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">¡Test Completado!</h2>
            <p className="text-gray-400">Estos son tus resultados</p>
          </div>

          <div className="bg-gradient-to-br from-[#656565] to-[#e99b63] rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-white mb-3">{result.type}</h3>
            <p className="text-white/90 text-lg">{result.description}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-white mb-4">Carreras recomendadas:</h4>
            <div className="space-y-3">
              {result.topCareers.map((career, index) => (
                <div key={index} className="bg-black/50 border border-gray-800 rounded-lg p-4 hover:border-[#e99b63]/50 transition-all">
                  <div className="flex justify-between items-center">
                    <p className="text-white font-medium">{career.name}</p>
                    <span className="text-sm font-bold text-[#e99b63]">{career.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-[#656565] to-[#e99b63] text-white py-4 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(233,155,99,0.5)] transition-all duration-200"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black grid-pattern flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-4xl text-[#e99b63] mx-auto mb-4" />
          <p className="text-white">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black grid-pattern flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#e99b63] text-white px-4 py-2 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black grid-pattern flex items-center justify-center">
        <p className="text-white">No hay preguntas disponibles.</p>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-black grid-pattern flex flex-col p-4">
      {/* Header con logo y robot */}
      <div className="w-full flex justify-center py-4 mb-4">
        <div className="flex items-center space-x-2">
          {/* Robot 3D pequeño */}
          <div className="w-20 h-16 flex-shrink-0 overflow-hidden -ml-2">
            <div className="w-64 h-64 -mt-24 -ml-24 scale-50">
              <Spline
                className="w-full h-full"
                scene="https://prod.spline.design/KFfQUE95SIab8qAr/scene.splinecode"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#e99b63] to-[#ff8c42] bg-clip-text text-transparent whitespace-nowrap">
            VocacionalApp
          </h1>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        {/* Header con progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Volver
            </button>
            <span className="text-white font-semibold">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          
          {/* Barra de progreso */}
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#656565] to-[#e99b63] transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pregunta actual */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-2xl p-8 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-6 bg-black/50 border border-gray-800 rounded-xl hover:border-[#e99b63] hover:bg-gray-800/30 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full border-2 border-gray-700 group-hover:border-[#e99b63] flex items-center justify-center mr-4 transition-colors">
                    <span className="text-gray-400 group-hover:text-[#e99b63] font-semibold transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="text-white text-lg">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}