
import React, { useState, useRef, useEffect } from 'react';
import LocationInput from './components/LocationInput';
import AQIDisplay from './components/AQIDisplay';
import AQIAnalysis from './components/AQIAnalysis';
import { fetchAirQuality } from './services/api';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resultsRef = useRef(null);

  useEffect(() => {
    if (data && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);

  const handleSearch = async (lat, lon) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchAirQuality(lat, lon);
      setData(result);
    } catch (err) {
      setError(err.message || 'Không thể lấy dữ liệu AQI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>AQI Now</h1>

      </header>

      <main>
        <LocationInput onSearch={handleSearch} />

        {loading && <div className="loading">Đang tải dữ liệu...</div>}

        {error && <div className="error-display">{error}</div>}

        {data && (
          <div ref={resultsRef} className="results-container">
            <AQIDisplay data={data} />
            <AQIAnalysis aqi={data.current.pollution.aqius} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
