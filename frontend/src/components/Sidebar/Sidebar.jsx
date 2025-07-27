import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const levelItems = [
  { label: 'Lộ trình', path: 'roadmap' },
  { label: 'Tài liệu', path: 'materials' },
  { label: 'Từ vựng', path: 'vocabulary' },
  { label: 'Kì thi', path: 'exam' },
]

export default function Sidebar({ open, onClose }) {
  const [openLevel, setOpenLevel] = useState(null)
  const navigate = useNavigate()
  return (
    <div className={`sidebar${open ? ' open' : ''}`}>
      <button className="sidebar-close-btn" onClick={onClose}>&times;</button>
      <div className="sidebar-links">
        <div onClick={() => { navigate('/'); onClose() }}>Trang chủ</div>
        <div
          className={`sidebar-dropdown${openLevel !== null ? ' open' : ''}`}
          onClick={() => setOpenLevel(openLevel === null ? 0 : null)}
        >
          Trình độ
          {openLevel !== null && (
            <div className="sidebar-dropdown-content">
              {levels.map(lvl => (
                <div key={lvl}>
                  <div
                    style={{ fontWeight: 600, marginBottom: 4, cursor: 'pointer' }}
                    onClick={e => { e.stopPropagation(); setOpenLevel(lvl === openLevel ? null : lvl) }}
                  >
                    {lvl}
                  </div>
                  {openLevel === lvl && (
                    <div className="sidebar-dropdown-content">
                      {levelItems.map(item => (
                        <div
                          key={item.path}
                          style={{ marginLeft: 8, cursor: 'pointer' }}
                          onClick={() => { navigate(`/${item.path}/${lvl}`); onClose() }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div onClick={() => { navigate('/studienkolleg'); onClose() }}>Studienkolleg</div>
        <div onClick={() => { navigate('/about'); onClose() }}>Về chúng tôi</div>
        <div onClick={() => { navigate('/vip'); onClose() }}>VIP</div>
        <div onClick={() => { navigate('/login'); onClose() }}>Đăng nhập</div>
      </div>
    </div>
  )
}
