
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

export const fetchUVIndex = async (lat, lon) => {
    try {
        // Request only 1 day (today) to simplify indexing. timezone=auto ensures the hours align with local time of the coordinates.
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto&forecast_days=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.hourly && data.hourly.uv_index) {
            // Since we requested 1 day determined by the location's timezone, 
            // the array contains 24 hours starting from 00:00 local time.
            // We can simply use the current hour of the user's system time (assuming user is at that location) 
            // to index into the array.
            const currentHour = new Date().getHours();

            if (data.hourly.uv_index[currentHour] !== undefined) {
                return data.hourly.uv_index[currentHour];
            }
        }
        return 0;
    } catch (error) {
        console.error('Error fetching UV index:', error);
        return null;
    }
};
