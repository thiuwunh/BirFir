import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { StoreContext } from '../../contexts/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'


export default function Login() {
  const notifyRegister = () => toast('Đăng ký thành công! Vui lòng xác nhận Email của bạn.')
  const notifyLogin = () => toast('Đăng nhập thành công!')
  const [tab, setTab] = useState('login')
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    level: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { url, token, setToken, setisLoggedin } = useContext(StoreContext)

  const handleChange = e => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = e => {
    e.preventDefault()

    if (!data.username || !data.password) {
      setError('Vui lòng nhập tài khoản và mật khẩu')
      return
    }

    let newUrl = url + '/api/users/login';

    let newData = JSON.stringify({
      username: data.username,
      password: data.password
    });

    axios.post(newUrl, newData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setisLoggedin(true)
      setToken(res.data.token)
      setError('')
      localStorage.setItem('token', res.data.token)
      notifyLogin()
      navigate('/')
    }).catch(err => {
      setError(err.response.data.message || 'Lỗi đăng nhập, vui lòng thử lại');
      return;
    })
  }

  const handleRegister = e => {
    e.preventDefault()

    let newUrl = url + '/api/users/register';
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc')
      return
    }
    if (data.password !== data.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp')
      return
    }
    
    let newData = JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        level: data.level
      })

    axios.post(newUrl, newData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setTab('login')
      notifyRegister()
      setError('')
    }).catch(err => {
      setError(err.response.data.message || 'Lỗi đăng ký, vui lòng thử lại');
      return;
    })
  }

  return (
    <div className="container login-container">
      <div className="flex-row login-tabs">
        <button className={`btn${tab === 'login' ? '' : ' secondary'}`} onClick={() => setTab('login')}>Đăng nhập</button>
        <button className={`btn${tab === 'register' ? '' : ' secondary'}`} onClick={() => setTab('register')}>Đăng ký</button>
      </div>
      <form onSubmit={tab === 'login' ? handleLogin : handleRegister}>
        <div className="form-group">
          <label className="form-label">Tài khoản*</label>
          <input
            className="form-input"
            name="username"
            value={data.username}
            onChange={handleChange}
            autoFocus
          />
        </div>
        {tab === 'register' && (
          <>
            <div className="form-group">
              <label className="form-label">Email*</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label className="form-label">Mật khẩu*</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        {tab === 'register' && (
          <>
            <div className="form-group">
              <label className="form-label">Nhập lại mật khẩu*</label>
              <input
                className="form-input"
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Level</label>
              <select
                className="form-input"
                name="level"
                value={data.level}
                onChange={handleChange}
              >
                <option value="">Chọn trình độ</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
          </>
        )}
        {error && <div className="form-error">{error}</div>}
        <button className="btn" type="submit">{tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}</button>
      </form>
    </div>
  )
}