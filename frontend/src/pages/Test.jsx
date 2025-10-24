import { useState } from 'react';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

export default function Test() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "¿Qué tipo de actividades disfrutas más?",
      options: [
        { text: "Resolver problemas matemáticos o lógicos", value: "A" },
        { text: "Ayudar a otras personas o trabajar en equipo", value: "B" },
        { text: "Crear o diseñar cosas nuevas", value: "C" }
      ]
    },
    {
      id: 2,
      question: "¿Cómo te consideras cuando enfrentas un problema?",
      options: [
        { text: "Analítico: busco entender la causa y encontrar una solución lógica", value: "A" },
        { text: "Práctico: actúo rápido para resolverlo", value: "B" },
        { text: "Creativo: busco soluciones fuera de lo común", value: "C" }
      ]
    },
    {
      id: 3,
      question: "¿Qué materia te interesa más?",
      options: [
        { text: "Matemática o física", value: "A" },
        { text: "Biología o psicología", value: "B" },
        { text: "Arte o literatura", value: "C" }
      ]
    },
    {
      id: 4,
      question: "¿Qué ambiente de trabajo prefieres?",
      options: [
        { text: "Oficina o laboratorio con herramientas tecnológicas", value: "A" },
        { text: "Espacios con interacción constante con personas", value: "B" },
        { text: "Lugares donde pueda expresar ideas y creatividad", value: "C" }
      ]
    },
    {
      id: 5,
      question: "¿Qué te motiva más en un proyecto?",
      options: [
        { text: "Lograr que todo funcione correctamente", value: "A" },
        { text: "Ver cómo ayuda o mejora la vida de las personas", value: "B" },
        { text: "Que sea visualmente atractivo o innovador", value: "C" }
      ]
    },
    {
      id: 6,
      question: "¿Cómo te describirían tus amigos?",
      options: [
        { text: "Lógico y organizado", value: "A" },
        { text: "Solidario y comunicativo", value: "B" },
        { text: "Original y artístico", value: "C" }
      ]
    },
    {
      id: 7,
      question: "¿Qué tipo de noticias o temas te llaman más la atención?",
      options: [
        { text: "Ciencia, tecnología e innovación", value: "A" },
        { text: "Sociedad, salud y bienestar", value: "B" },
        { text: "Arte, diseño y cultura", value: "C" }
      ]
    },
    {
      id: 8,
      question: "Si pudieras elegir un proyecto para liderar, ¿cuál sería?",
      options: [
        { text: "Construir una app o sistema útil", value: "A" },
        { text: "Coordinar una campaña solidaria", value: "B" },
        { text: "Dirigir una producción audiovisual o artística", value: "C" }
      ]
    },
    {
      id: 9,
      question: "¿Qué disfrutas más al trabajar?",
      options: [
        { text: "Resolver desafíos técnicos", value: "A" },
        { text: "Colaborar y comunicarme con los demás", value: "B" },
        { text: "Imaginar y crear conceptos nuevos", value: "C" }
      ]
    },
    {
      id: 10,
      question: "¿Qué tipo de tareas prefieres?",
      options: [
        { text: "Aquellas que requieren precisión y detalle", value: "A" },
        { text: "Aquellas que implican contacto con personas", value: "B" },
        { text: "Aquellas que permitan improvisar o innovar", value: "C" }
      ]
    },
    {
      id: 11,
      question: "Si tienes que presentar un trabajo, ¿cómo prefieres hacerlo?",
      options: [
        { text: "Con datos y gráficos claros", value: "A" },
        { text: "Explicándolo con entusiasmo y ejemplos", value: "B" },
        { text: "A través de una presentación visual o creativa", value: "C" }
      ]
    },
    {
      id: 12,
      question: "¿Qué tipo de herramientas te gusta usar más?",
      options: [
        { text: "Computadoras, software o aparatos electrónicos", value: "A" },
        { text: "Libros, materiales educativos o de comunicación", value: "B" },
        { text: "Cámaras, instrumentos o materiales artísticos", value: "C" }
      ]
    },
    {
      id: 13,
      question: "¿Qué opinas sobre trabajar en grupo?",
      options: [
        { text: "Me gusta si todos tienen roles definidos", value: "A" },
        { text: "Me encanta interactuar y compartir ideas", value: "B" },
        { text: "Prefiero trabajar solo cuando necesito concentrarme", value: "C" }
      ]
    },
    {
      id: 14,
      question: "¿Qué te resulta más satisfactorio?",
      options: [
        { text: "Resolver un problema complejo", value: "A" },
        { text: "Ayudar a alguien o enseñar algo nuevo", value: "B" },
        { text: "Ver que algo que creé causa impacto visual o emocional", value: "C" }
      ]
    },
    {
      id: 15,
      question: "¿Qué te gustaría aprender más en el futuro?",
      options: [
        { text: "Programación, ingeniería o finanzas", value: "A" },
        { text: "Psicología, pedagogía o medicina", value: "B" },
        { text: "Diseño, música o comunicación audiovisual", value: "C" }
      ]
    }
  ];

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

  const calculateResults = () => {
    const counts = { A: 0, B: 0, C: 0 };
    Object.values(answers).forEach(answer => {
      counts[answer]++;
    });

    if (counts.A >= counts.B && counts.A >= counts.C) {
      return {
        type: "Carreras Técnicas y Científicas",
        description: "Te inclinas hacia áreas de ingeniería, tecnología, matemáticas y ciencias exactas.",
        careers: ["Ingeniería en Sistemas", "Ingeniería Civil", "Física", "Matemáticas Aplicadas", "Ciencias de la Computación"]
      };
    } else if (counts.B >= counts.C) {
      return {
        type: "Carreras Sociales y Humanísticas",
        description: "Te atraen las áreas relacionadas con el servicio, la salud y el bienestar de las personas.",
        careers: ["Psicología", "Medicina", "Trabajo Social", "Pedagogía", "Enfermería"]
      };
    } else {
      return {
        type: "Carreras Creativas y Artísticas",
        description: "Tu perfil se orienta hacia el diseño, las artes y la comunicación visual.",
        careers: ["Diseño Gráfico", "Arquitectura", "Comunicación Audiovisual", "Bellas Artes", "Diseño de Moda"]
      };
    }
  };

  if (showResults) {
    const result = calculateResults();
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
              {result.careers.map((career, index) => (
                <div key={index} className="bg-black/50 border border-gray-800 rounded-lg p-4 hover:border-[#e99b63]/50 transition-all">
                  <p className="text-white font-medium">{career}</p>
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