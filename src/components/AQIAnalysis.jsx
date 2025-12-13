
import React from 'react';
import './AQIAnalysis.css';

function AQIAnalysis({ aqi }) {
    if (aqi === null || aqi === undefined) return null;

    const getAnalysis = (aqi) => {
        if (aqi <= 50) {
            return {
                level: 'Tốt',
                color: '#00e400',
                analysis: 'Chất lượng không khí đạt mức lý tưởng cho sức khỏe cộng đồng. Không khí trong lành, không có ô nhiễm hoặc ô nhiễm không đáng kể.',
                recommendation: 'Tự do thực hiện các hoạt động ngoài trời. Mở cửa sổ để thông thoáng nhà cửa.'
            };
        }
        if (aqi <= 100) {
            return {
                level: 'Trung bình',
                color: '#ffff00',
                analysis: 'Chất lượng không khí ở mức chấp nhận được. Tuy nhiên, có thể có một số chất gây ô nhiễm ảnh hưởng tới một số ít người rất nhạy cảm với ô nhiễm không khí.',
                recommendation: 'Những người nhạy cảm với ô nhiễm nên cân nhắc giảm bớt các hoạt động gắng sức ngoài trời.'
            };
        }
        if (aqi <= 150) {
            return {
                level: 'Kém cho nhóm nhạy cảm',
                color: '#ff7e00',
                analysis: 'Nhóm nhạy cảm (người già, trẻ em, người có bệnh hô hấp) có thể bị ảnh hưởng sức khỏe. Công chúng nói chung ít có khả năng bị ảnh hưởng.',
                recommendation: 'Người thuộc nhóm nhạy cảm nên giảm hoạt động ngoài trời. Đeo khẩu trang khi ra ngoài.'
            };
        }
        if (aqi <= 200) {
            return {
                level: 'Xấu',
                color: '#ff0000',
                analysis: 'Cảnh báo sức khỏe: mọi người có thể bắt đầu cảm nhận được các ảnh hưởng tới sức khỏe. Nhóm nhạy cảm có thể bị ảnh hưởng nghiêm trọng hơn.',
                recommendation: 'Hạn chế tối đa ra ngoài. Đóng cửa sổ, sử dụng máy lọc không khí nếu có. Đeo khẩu trang chống bụi mịn.'
            };
        }
        if (aqi <= 300) {
            return {
                level: 'Rất xấu',
                color: '#8f3f97',
                analysis: 'Cảnh báo sức khỏe khẩn cấp: toàn bộ dân số có khả năng bị ảnh hưởng.',
                recommendation: 'Mọi người nên tránh các hoạt động ngoài trời. Đóng cửa kín, bảo vệ sức khỏe hô hấp đặc biệt cẩn thận.'
            };
        }
        return {
            level: 'Nguy hại',
            color: '#7e0023',
            analysis: 'Báo động sức khỏe: mọi người có thể gặp các vấn đề sức khỏe nghiêm trọng.',
            recommendation: 'Không ra ngoài. Ở trong nhà và sử dụng các biện pháp lọc khí tối đa.'
        };
    };

    const { level, color, analysis, recommendation } = getAnalysis(aqi);

    return (
        <div className="aqi-analysis-card" style={{ borderLeft: `5px solid ${color}` }}>
            <h3 style={{ color: color }}>Phân tích & Khuyến cáo ({level})</h3>

            <div className="analysis-section">
                <h4 className="section-title">Phân tích:</h4>
                <p>{analysis}</p>
            </div>

            <div className="recommendation-section">
                <h4 className="section-title">Khuyến cáo hành động:</h4>
                <p>{recommendation}</p>
            </div>
        </div>
    );
}

export default AQIAnalysis;
