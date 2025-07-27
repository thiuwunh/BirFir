import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import About from './pages/About/About'
import Studienkolleg from './pages/Studienkolleg/Studienkolleg'
import VIP from './pages/VIP/VIP'
import Roadmap from './pages/Roadmap/Roadmap'
import Materials from './pages/Materials/Materials'
import Vocabulary from './pages/Vocabulary/Vocabulary'
import Exam from './pages/Exam/Exam'
import UserManagement from './pages/UserManagement/UserManagement'
import Error from './pages/Error/Error'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/studienkolleg" element={<Studienkolleg />} />
          <Route path="/vip" element={<VIP />} />
          <Route path="/roadmap/:level" element={<Roadmap />} />
          <Route path="/materials/:level" element={<Materials />} />
          <Route path="/vocabulary/:level" element={<Vocabulary />} />
          <Route path="/exam/:level" element={<Exam />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Layout>
      <ToastContainer position="top-center" autoClose={3000}/>
    </Router>
  )
}

export default App
