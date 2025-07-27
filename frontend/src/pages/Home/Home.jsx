import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Slider from '../../components/Slider/Slider'
import './Home.css'

const sliderImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
]
const sliderLinks = [
  '/roadmap/A1',
  '/materials/A1',
  '/vocabulary/A1',
]

const teamImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/65.jpg',
]

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const parts = [
  { label: 'Lộ trình', path: 'roadmap' },
  { label: 'Tài liệu', path: 'materials' },
  { label: 'Từ vựng', path: 'vocabulary' },
  { label: 'Kì thi', path: 'exam' },
]

export default function Home() {
  const navigate = useNavigate()
  const [selectedPart, setSelectedPart] = useState(parts[0].path)
  const [selectedLevel, setSelectedLevel] = useState(levels[0])

  return (
    <div>
      <Slider images={sliderImages} links={sliderLinks} />
      <div className="container">
        <div className="container-title">Chọn phần bạn muốn học</div>
        <div className="flex-row home-select-row">
          <select
            className="form-input"
            value={selectedPart}
            onChange={e => setSelectedPart(e.target.value)}
          >
            {parts.map(p => (
              <option key={p.path} value={p.path}>{p.label}</option>
            ))}
          </select>
          <select
            className="form-input"
            value={selectedLevel}
            onChange={e => setSelectedLevel(e.target.value)}
          >
            {levels.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
          <button
            className="btn"
            onClick={() => navigate(`/${selectedPart}/${selectedLevel}`)}
          >
            Bắt đầu
          </button>
        </div>
      </div>
      <div className="container">
        <div className="container-title">Giới thiệu Team</div>
        <div className="flex-row home-team-row">
          {teamImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Team"
              className="home-team-img"
            />
          ))}
        </div>
        <button className="btn" onClick={() => navigate('/about')}>Tìm hiểu thêm</button>
      </div>
      <div className="container home-vip-container">
        <div className="container-title">Đăng ký VIP</div>
        <div>Hỗ trợ trang web phát triển, nhận nhiều quyền lợi hơn!</div>
        <button className="btn" onClick={() => navigate('/vip')}>Trở thành VIP</button>
      </div>
    </div>
  )
}