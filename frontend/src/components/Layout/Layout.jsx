import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Taskbar from '../Taskbar/Taskbar'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import './Layout.css'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <Taskbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main
        className="main-content"
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
