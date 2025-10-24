import fetch from "node-fetch";

const API_KEY = process.env.OPENAI_API_KEY;

export async function generarPerfil() {
  const prompt = `Eres un asesor vocacional experto, breve, claro y práctico. 
Genera un pequeño perfil vocacional general destacando posibles áreas de afinidad, 
habilidades potenciales y recomendaciones de estilo de trabajo.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-mini",
      messages: [
        { role: "system", content: "Asesor vocacional experto" },
        { role: "user", content: prompt }
      ],
      max_tokens: 600
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? null;
}

//  Entrevista simulada (carrera + mensaje usuario)
export async function interviewChatbot(careerName, userMessage) {
  const prompt = `Eres un entrevistador profesional simulando una entrevista laboral para la carrera: ${careerName}.

El candidato dice: "${userMessage}"

Responde como entrevistador, haciendo una nueva pregunta relevante sobre experiencia, habilidades o motivación, manteniendo un tono profesional y constructivo.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-mini",
      messages: [
        { role: "system", content: "Eres un entrevistador experto en selección de personal." },
        { role: "user", content: prompt }
      ],
      max_tokens: 400
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No se pudo continuar la entrevista.";
}

// Bot de Oportunidades Laborales en Guatemala
export async function jobOpportunitiesBot(topCareers, userMessage) {
  const careersText = topCareers.map(c => `${c.name} (puntuación: ${c.score})`).join(', ');

  const prompt = `Eres un experto en mercado laboral de Guatemala.

Estas son las top 3 carreras resultado de un test vocacional: ${careersText}.

El usuario pregunta: "${userMessage}"

Basándote en las carreras indicadas, responde específicamente a lo que el usuario solicita,
y si pide oportunidades laborales, genera al menos 10 opciones reales y actuales de Guatemala,
incluye breve descripción y habilidades necesarias. Mantén claridad y utilidad.`;

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
  return data.choices?.[0]?.message?.content ?? "No se pudieron generar las oportunidades laborales.";
}