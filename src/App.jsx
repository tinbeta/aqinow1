import React, { useState, useEffect } from 'react';
import AQIDisplay from './components/AQIDisplay';
import AQIAnalysis from './components/AQIAnalysis';
import { fetchAirQuality } from './services/api';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAQI = async (lat, lon) => {
      try {
        const result = await fetchAirQuality(lat, lon);
        setData(result);
      } catch (err) {
        setError(err.message || 'Không thể lấy dữ liệu AQI');
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAQI(latitude, longitude);
        },
        (err) => {
          setLoading(false);
          setError('Không thể lấy vị trí. Vui lòng cấp quyền định vị.');
        }
      );
    } else {
      setLoading(false);
      setError('Trình duyệt không hỗ trợ định vị.');
    }
  }, []);

  if (loading) return <div className="loading-screen">Dang tải dữ liệu...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AQI Now</h1>
        <p className="app-description">Chất lượng không khí ngay tại vị trí của tôi</p>
        <div className="header-info">
          <p>Lưu ý: Kết quả dựa trên máy đo gần với vị trí định vị nhất.</p>
          <p>Dữ liệu được cung cấp bởi IQAir</p>
        </div>
      </header>

      {data && (
        <div className="compact-layout">
          <AQIDisplay data={data} />
          <AQIAnalysis aqi={data.current.pollution.aqius} />
        </div>
      )}
    </div>
  );
}

export default App;
