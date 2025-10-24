export const calculateResults = (answers) => {
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