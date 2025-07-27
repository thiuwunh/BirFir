import { useState } from 'react'
import './Studienkolleg.css'

const schools = [
  {
    name: 'Studienkolleg Berlin',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    state: 'Berlin',
    city: 'Berlin',
    block: 'W',
    info: 'Trường dự bị đại học nổi tiếng tại Berlin.'
  },
  {
    name: 'Studienkolleg München',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    state: 'Bayern',
    city: 'München',
    block: 'T',
    info: 'Trường dự bị đại học tại München, bang Bayern.'
  },
  {
    name: 'Studienkolleg Hamburg',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    state: 'Hamburg',
    city: 'Hamburg',
    block: 'G',
    info: 'Trường dự bị đại học tại Hamburg.'
  },
]

export default function Studienkolleg() {
  const [filter, setFilter] = useState({ name: '', state: '', city: '', block: '' })
  const filtered = schools.filter(s =>
    (!filter.name || s.name.toLowerCase().includes(filter.name.toLowerCase())) &&
    (!filter.state || s.state === filter.state) &&
    (!filter.city || s.city === filter.city) &&
    (!filter.block || s.block === filter.block)
  )
  return (
    <div className="container">
      <div className="container-title">Studienkolleg ở Đức</div>
      <div className="flex-row studienkolleg-filter-row">
        <input
          className="form-input"
          placeholder="Tên trường"
          value={filter.name}
          onChange={e => setFilter(f => ({ ...f, name: e.target.value }))}
        />
        <input
          className="form-input"
          placeholder="Bang"
          value={filter.state}
          onChange={e => setFilter(f => ({ ...f, state: e.target.value }))}
        />
        <input
          className="form-input"
          placeholder="Thành phố"
          value={filter.city}
          onChange={e => setFilter(f => ({ ...f, city: e.target.value }))}
        />
        <select
          className="form-input"
          value={filter.block}
          onChange={e => setFilter(f => ({ ...f, block: e.target.value }))}
        >
          <option value="">Khối</option>
          <option value="W">W</option>
          <option value="G">G</option>
          <option value="T">T</option>
          <option value="M">M</option>
        </select>
      </div>
      <div className="flex-col studienkolleg-list">
        {filtered.map((s, i) => (
          <div className="flex-row studienkolleg-card" key={i}>
            <img src={s.img} alt={s.name} className="studienkolleg-img" />
            <div>
              <div className="studienkolleg-name">{s.name}</div>
              <div className="studienkolleg-info">{s.info}</div>
              <div className="studienkolleg-meta">
                Bang: {s.state} | Thành phố: {s.city} | Khối: {s.block}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div>Không tìm thấy trường phù hợp.</div>}
      </div>
    </div>
  )
}