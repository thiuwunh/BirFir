import { useParams } from 'react-router-dom'
import './Roadmap.css'

export default function Roadmap() {
  const { level } = useParams()
  return (
    <div className="container">
      <div className="container-title">Lộ trình {level}</div>
      <div>Trang đang cập nhật nội dung cho lộ trình {level}...</div>
    </div>
  )
}