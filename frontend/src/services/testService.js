const API_BASE_URL = 'http://localhost:4000/api';

export const fetchTests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tests`);
    if (!response.ok) {
      throw new Error('Failed to fetch tests');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};