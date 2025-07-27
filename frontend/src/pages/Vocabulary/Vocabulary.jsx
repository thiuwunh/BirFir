import { useParams } from 'react-router-dom'
import './Vocabulary.css'

export default function Vocabulary() {
  const { level } = useParams()
  return (
    <div className="container">
      <div className="container-title">Từ vựng {level}</div>
      <div>Trang đang cập nhật nội dung từ vựng cho trình độ {level}...</div>
    </div>
  )
}