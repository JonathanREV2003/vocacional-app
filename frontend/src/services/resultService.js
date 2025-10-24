const RESULTS_KEY = 'vocacionalApp_results';

export const saveResult = (result) => {
  const results = getResults();
  const newResult = {
    ...result,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    id: Date.now(),
  };
  // Check if the last result is the same to prevent duplicates
  if (results.length === 0 || JSON.stringify(results[results.length - 1]) !== JSON.stringify(newResult)) {
    results.push(newResult);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  }
};

export const getResults = () => {
  const results = localStorage.getItem(RESULTS_KEY);
  return results ? JSON.parse(results) : [];
};

export const clearResults = () => {
  localStorage.removeItem(RESULTS_KEY);
};