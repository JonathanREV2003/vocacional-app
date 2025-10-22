// instalar: npm i node-fetch -s
import fetch from "node-fetch";

const API_KEY = process.env.OPENAI_API_KEY;

// Función para generar perfil vocacional
async function generarPerfil(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-mini", // Cambiado a gpt-4-mini
      messages: [
        { role: "system", content: "Eres un asesor vocacional breve y práctico." },
        { role: "user", content: prompt }
      ],
      max_tokens: 600
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? null;
}

// Chatbot para entrevistas simuladas
export async function interviewChatbot(topCareers, userMessage) {
  const careersText = topCareers.map(c => c.name).join(', ');

  const prompt = `Eres un entrevistador profesional simulando una entrevista de trabajo para las siguientes carreras: ${careersText}.

El candidato dice: "${userMessage}"

Responde como entrevistador, haciendo preguntas relevantes sobre experiencia, habilidades y motivación para estas carreras. Mantén la conversación profesional y constructiva.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-mini",
      messages: [
        { role: "system", content: "Eres un entrevistador profesional para posiciones relacionadas con las carreras mencionadas." },
        { role: "user", content: prompt }
      ],
      max_tokens: 400
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Lo siento, no pude procesar tu respuesta.";
}

// Bot para oportunidades laborales
export async function jobOpportunitiesBot(userResponses, topCareers) {
  const careersText = topCareers.map(c => `${c.name} (puntuación: ${c.score})`).join(', ');

  const prompt = `Basado en las respuestas del test vocacional y las top 3 carreras identificadas: ${careersText}

Proporciona información actual sobre oportunidades laborales, tendencias del mercado, habilidades requeridas y consejos para ingresar a estas carreras.

Estructura la respuesta de manera clara y práctica.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-mini",
      messages: [
        { role: "system", content: "Eres un experto en mercado laboral y orientación profesional." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No se pudo generar información sobre oportunidades laborales.";
}

// Exportar función original para compatibilidad
export { generarPerfil };