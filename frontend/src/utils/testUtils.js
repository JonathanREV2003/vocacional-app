export const calculateResults = (answers) => {
  const counts = { A: 0, B: 0, C: 0 };
  Object.values(answers).forEach(answer => {
    counts[answer]++;
  });

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const maxCount = Math.max(...Object.values(counts));
  const percentage = total > 0 ? Math.round((maxCount / total) * 100) : 0;

  let topCareers = [];
  if (counts.A >= counts.B && counts.A >= counts.C) {
    topCareers = [
      { name: "Ingeniería en Sistemas", percentage },
      { name: "Ingeniería Civil", percentage },
      { name: "Física", percentage }
    ];
    return {
      type: "Carreras Técnicas y Científicas",
      description: "Te inclinas hacia áreas de ingeniería, tecnología, matemáticas y ciencias exactas.",
      careers: ["Ingeniería en Sistemas", "Ingeniería Civil", "Física", "Matemáticas Aplicadas", "Ciencias de la Computación"],
      topCareers,
      percentage
    };
  } else if (counts.B >= counts.C) {
    topCareers = [
      { name: "Psicología", percentage },
      { name: "Medicina", percentage },
      { name: "Trabajo Social", percentage }
    ];
    return {
      type: "Carreras Sociales y Humanísticas",
      description: "Te atraen las áreas relacionadas con el servicio, la salud y el bienestar de las personas.",
      careers: ["Psicología", "Medicina", "Trabajo Social", "Pedagogía", "Enfermería"],
      topCareers,
      percentage
    };
  } else {
    topCareers = [
      { name: "Diseño Gráfico", percentage },
      { name: "Arquitectura", percentage },
      { name: "Comunicación Audiovisual", percentage }
    ];
    return {
      type: "Carreras Creativas y Artísticas",
      description: "Tu perfil se orienta hacia el diseño, las artes y la comunicación visual.",
      careers: ["Diseño Gráfico", "Arquitectura", "Comunicación Audiovisual", "Bellas Artes", "Diseño de Moda"],
      topCareers,
      percentage
    };
  }
};