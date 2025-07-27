import { useParams } from 'react-router-dom'
import './Materials.css'

export default function Materials() {
  const { level } = useParams()
  return (
    <div className="container">
      <div className="container-title">Tài liệu {level}</div>
      <div>Trang đang cập nhật nội dung tài liệu cho trình độ {level}...</div>
    </div>
  )
}