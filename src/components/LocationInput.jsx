
import React, { useState } from 'react';
import './LocationInput.css';

function LocationInput({ onSearch }) {
    const [coords, setCoords] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMyLocation = () => {
        if (!navigator.geolocation) {
            setError('Trình duyệt của bạn không hỗ trợ định vị.');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoords(`${latitude}, ${longitude}`);
                onSearch(latitude, longitude);
                setLoading(false);
                setError(''); // Clear any previous errors
            },
            (err) => {
                setLoading(false);
                setError('Không thể lấy vị trí của bạn. Vui lòng cấp quyền.');
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation: "lat, lon"
        const parts = coords.split(',').map(s => s.trim());
        if (parts.length !== 2) {
            setError('Vui lòng nhập định dạng "vĩ độ, kinh độ"');
            return;
        }

        const lat = parseFloat(parts[0]);
        const lon = parseFloat(parts[1]);

        if (isNaN(lat) || isNaN(lon)) {
            setError('Tọa độ không hợp lệ');
            return;
        }

        setError('');
        onSearch(lat, lon);
    };

    return (
        <div className="location-input-container">
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={coords}
                    onChange={(e) => setCoords(e.target.value)}
                    placeholder="Nhập tọa độ (vd: 10.71, 106.66)"
                    className="coord-input"
                />
                <button type="submit" className="search-btn">
                    Tìm kiếm
                </button>
            </form>

            <div className="my-location-section">
                <span className="my-location-text">Kiểm tra chất lượng không khí ngay tại vị trí của tôi</span>
                <button onClick={handleMyLocation} className="my-location-btn" disabled={loading}>
                    {loading ? 'Đang lấy...' : 'Kiểm Tra'}
                </button>
            </div>

            {error && <p className="error-msg">{error}</p>}
        </div>
    );
}

export default LocationInput;
