import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import './Taskbar.css'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const levelItems = [
  { label: 'Lộ trình', path: 'roadmap' },
  { label: 'Tài liệu', path: 'materials' },
  { label: 'Từ vựng', path: 'vocabulary' },
  { label: 'Kì thi', path: 'exam' },
]

export default function Taskbar({ onSidebarOpen }) {
  const navigate = useNavigate()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isLoggedin, setisLoggedin } = useContext(StoreContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    setisLoggedin(false);
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="taskbar">
      <div className="taskbar-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxzZOVp8ECLTeTsdb8uQzzPKDJre0Y2G6GOw&s"
          alt="Logo"
          className="taskbar-logo"
          onClick={() => {if (windowWidth > 750) navigate('/'); else onSidebarOpen()}}
          style={{ marginRight: 24 }}
        />
      </div>

      <div className="taskbar-center">
        <Link className="taskbar-link" to="/">Trang chủ</Link>
        {windowWidth > 1000 ? (
          levelItems.map(item => (
            <div className="taskbar-dropdown" key={item.path}>
              {item.label}
              <div className="taskbar-dropdown-content">
                {levels.map(lvl => (
                  <div
                    className="taskbar-dropdown-item"
                    key={lvl}
                    onClick={() => navigate(`/${item.path}/${lvl}`)}
                  >
                    {item.label} {lvl}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="taskbar-dropdown">
            Trình độ
            <div className="taskbar-dropdown-content">
              {levels.map(lvl => (
                <div
                  className="taskbar-dropdown-item"
                  key={lvl}
                >
                  <span>{lvl}</span>
                  <div className="taskbar-dropdown-content">
                    {levelItems.map(item => (
                      <div
                        className="taskbar-dropdown-item"
                        key={item.path}
                        onClick={() => navigate(`/${item.path}/${lvl}`)}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Link className="taskbar-link" to="/studienkolleg">Studienkolleg</Link>
        <Link className="taskbar-link" to="/about">Về chúng tôi</Link>
        <Link className="taskbar-link" to="/vip">VIP</Link>
      </div>

      <div className="taskbar-right">
        {isLoggedin ? (
          <>
            <Link to="/user-management">
              <button className="taskbar-profile-btn">Profile</button>
            </Link>
            <button className="taskbar-logout-btn" onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">
              <button className="taskbar-login-btn">Đăng nhập</button>
          </Link>
        )}
      </div>
    </nav>
  )
}
