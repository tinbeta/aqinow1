
import React from 'react';
import './AQIDisplay.css';

function AQIDisplay({ data, uvIndex }) {
    if (!data) return null;

    const { city, country, current } = data;
    const { pollution, weather } = current;
    const aqi = pollution.aqius;

    const getAQIColor = (aqi) => {
        if (aqi <= 50) return { bg: '#00e400', text: '#000', label: 'Tốt' };
        if (aqi <= 100) return { bg: '#ffff00', text: '#000', label: 'Trung bình' };
        if (aqi <= 150) return { bg: '#ff7e00', text: '#fff', label: 'Kém cho nhóm nhạy cảm' };
        if (aqi <= 200) return { bg: '#ff0000', text: '#fff', label: 'Xấu' };
        if (aqi <= 300) return { bg: '#8f3f97', text: '#fff', label: 'Rất xấu' };
        return { bg: '#7e0023', text: '#fff', label: 'Nguy hại' };
    };

    const { bg, text, label } = getAQIColor(aqi);

    return (
        <div className="aqi-card">
            <div className="location-header">
                <h2>{city}</h2>
                <span className="country">{country}</span>
            </div>

            <div className="aqi-circle-container">
                <div className="aqi-circle" style={{ borderColor: bg, boxShadow: `0 0 30px ${bg}40` }}>
                    <span className="aqi-value" style={{ color: bg }}>{aqi}</span>
                    <span className="aqi-label">{label}</span>
                </div>
            </div>

            <div className="weather-grid">
                <div className="weather-item">
                    <span className="val">{weather.tp}°C</span>
                    <span className="lbl">Nhiệt độ</span>
                </div>
                <div className="weather-item">
                    <span className="val">{weather.hu}%</span>
                    <span className="lbl">Độ ẩm</span>
                </div>
                <div className="weather-item">
                    <span className="val">{weather.ws} m/s</span>
                    <span className="lbl">Gió</span>
                </div>
                {uvIndex !== null && uvIndex !== undefined && (
                    <div className="weather-item">
                        <span className="val">{uvIndex}</span>
                        <span className="lbl">UV Index</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AQIDisplay;
