
const API_KEY = '4332b8dc-1e98-4c8b-b745-ea67680b6398';
const BASE_URL = 'https://api.airvisual.com/v2/nearest_city';

export const fetchAirQuality = async (lat, lon) => {
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status !== 'success') {
            throw new Error(data.data.message || 'Failed to fetch data');
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        throw error;
    }
};
