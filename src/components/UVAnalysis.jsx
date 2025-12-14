import React from 'react';
import './AQIAnalysis.css'; // Reuse existing CSS

function UVAnalysis({ uvIndex }) {
    if (uvIndex === null || uvIndex === undefined) return null;

    const getUVInfo = (uv) => {
        const val = Math.round(uv);

        if (val <= 2) {
            return {
                level: 'Thấp',
                range: '0-2',
                color: '#A2D35A',
                description: 'Chỉ số tia cực tím thấp. Không cần biện pháp bảo vệ đặc biệt, nhưng vẫn nên đeo kính râm khi trời nắng gắt. Nếu ở ngoài trời hơn một giờ, hãy che chắn và bôi kem chống nắng. Sự phản chiếu từ tuyết hoặc mặt nước có thể làm tăng gấp đôi lượng tia UV.'
            };
        }
        if (val <= 5) {
            return {
                level: 'Trung bình',
                range: '3-5',
                color: '#F9D856',
                description: 'Cần có biện pháp bảo vệ. Hãy che chắn, đội mũ, đeo kính râm và bôi kem chống nắng, đặc biệt nếu bạn ở ngoài trời quá 30 phút. Tìm bóng mát vào buổi trưa khi ánh nắng mạnh nhất.'
            };
        }
        if (val <= 7) {
            return {
                level: 'Cao',
                range: '6-7',
                color: '#F18A31',
                description: 'Cần bảo vệ tích cực. Tia UV có thể gây hại cho da và gây cháy nắng. Hạn chế ra nắng từ 11 giờ sáng đến 3 giờ chiều. Hãy tìm bóng mát, che chắn cơ thể, đội mũ rộng vành, đeo kính râm và bôi kem chống nắng.'
            };
        }
        if (val <= 10) {
            return {
                level: 'Rất cao',
                range: '8-10',
                color: '#E53E33',
                description: 'Cảnh báo nguy hiểm cao. Da không được bảo vệ sẽ bị tổn thương và cháy nắng rất nhanh. Tránh ra nắng từ 11 giờ sáng đến 3 giờ chiều. Tìm bóng mát, che chắn kỹ, đội mũ, đeo kính râm và bôi kem chống nắng.'
            };
        }
        return {
            level: 'Cực độ',
            range: '11+',
            color: '#A97AD8',
            description: 'Cảnh báo cực kỳ nguy hiểm. Da không được bảo vệ có thể bị cháy nắng chỉ trong vài phút. Tránh tuyệt đối ánh nắng mặt trời từ 11 giờ sáng đến 3 giờ chiều. Bắt buộc phải che chắn kỹ, đội mũ, đeo kính râm và bôi kem chống nắng. Lưu ý cát trắng và các bề mặt sáng phản chiếu tia UV rất mạnh.'
        };
    };

    const { level, range, color, description } = getUVInfo(uvIndex);

    return (
        <div className="aqi-analysis-card" style={{ borderLeft: `5px solid ${color}`, marginTop: '1rem' }}>
            <h3 style={{ color: color }}>Chỉ số UV: {level} ({range})</h3>

            <div className="recommendation-section">
                <p>{description}</p>
            </div>
        </div>
    );
}

export default UVAnalysis;
