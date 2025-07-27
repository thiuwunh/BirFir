import { useState } from 'react'
import Modal from '../../components/Modal/Modal'
import './About.css'

const team = [
  {
    name: 'Nguyễn Văn A',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    info: 'Lập trình viên chính, sáng lập BirFir.',
    detail: 'Thành tích: DAAD Stipendium, IELTS 8.0, ...\nTrang cá nhân: https://github.com/nguyenvana'
  },
  {
    name: 'Trần Thị B',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    info: 'Chuyên gia nội dung tiếng Đức.',
    detail: 'Thành tích: TestDaF 5-5-5-5, ...\nTrang cá nhân: https://github.com/tranthib'
  },
  {
    name: 'Lê Văn C',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    info: 'Thiết kế UI/UX.',
    detail: 'Thành tích: Thiết kế nhiều dự án EdTech.\nTrang cá nhân: https://github.com/levanc'
  },
  {
    name: 'Phạm Thị D',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    info: 'Hỗ trợ cộng đồng.',
    detail: 'Thành tích: Tổ chức nhiều sự kiện học tiếng Đức.\nTrang cá nhân: https://github.com/phamthid'
  },
  {
    name: 'Hoàng Văn E',
    img: 'https://randomuser.me/api/portraits/men/77.jpg',
    info: 'Quản lý dự án.',
    detail: 'Thành tích: Quản lý nhiều dự án giáo dục.\nTrang cá nhân: https://github.com/hoangvane'
  },
]

export default function About() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className="container">
      <div className="container-title">Về chúng tôi</div>
      <div className="flex-row about-team-list">
        {team.map((m, i) => (
          <div
            key={i}
            className="about-team-card"
            onClick={() => setOpenIdx(i)}
          >
            <img
              src={m.img}
              alt={m.name}
              className="about-team-img"
            />
            <div className="about-team-name">{m.name}</div>
            <div className="about-team-info">{m.info}</div>
          </div>
        ))}
      </div>
      <Modal open={openIdx !== null} onClose={() => setOpenIdx(null)}>
        {openIdx !== null && (
          <div className="about-modal-content">
            <img
              src={team[openIdx].img}
              alt={team[openIdx].name}
              className="about-modal-img"
            />
            <div className="about-modal-name">{team[openIdx].name}</div>
            <div className="about-modal-info">{team[openIdx].info}</div>
            <pre className="about-modal-detail">{team[openIdx].detail}</pre>
          </div>
        )}
      </Modal>
    </div>
  )
}