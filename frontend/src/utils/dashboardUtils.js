import { getResults } from '../services/resultService';

export const computeDashboardStats = () => {
  try {
    const results = getResults();

    // Tests Completados
    const testsCompleted = results.length;

    // Áreas de Interés
    const uniqueTypes = new Set(results.filter(r => r && r.type).map(r => r.type));
    const areasOfInterest = uniqueTypes.size;

    // Compatibilidad  percentage
    let compatibility = { type: 'N/A', percentage: 0 };
    if (results.length > 0) {
      const typeCounts = {};
      results.forEach(r => {
        if (r && r.type) {
          typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
        }
      });
      if (Object.keys(typeCounts).length > 0) {
        const dominantType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
        const dominantCount = typeCounts[dominantType];
        const percentage = Math.round((dominantCount / results.length) * 100);
        compatibility = { type: dominantType, percentage };
      }
    }

    // Resultados Recientes top 3 careers
    const recentResults = [];
    results.slice(-3).reverse().forEach(r => {
      if (r && r.topCareers) {
        r.topCareers.forEach(career => {
          recentResults.push({
            career: career.name,
            compatibility: career.percentage,
            date: r.date
          });
        });
      }
    });

    return {
      testsCompleted,
      areasOfInterest,
      compatibility,
      recentResults: recentResults.slice(0, 3)
    };
  } catch (error) {
    console.error('Error computing dashboard stats:', error);
    return {
      testsCompleted: 0,
      areasOfInterest: 0,
      compatibility: { type: 'N/A', percentage: 0 },
      recentResults: []
    };
  }
};