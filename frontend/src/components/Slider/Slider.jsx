import { useState, useEffect } from 'react'
import './Slider.css'

export default function Slider({ images, links }) {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((idx + 1) % images.length)
  const prev = () => setIdx((idx - 1 + images.length) % images.length)

  useEffect(() => {
    const timer = setTimeout(next, 5000)
    return () => clearTimeout(timer)
  }, [idx, images.length])

  return (
    <div className="slider">
      <button className="slider-btn left" onClick={prev}>&lt;</button>
      <a href={links[idx]}>
        <img src={images[idx]} alt="" className="slider-img" />
      </a>
      <button className="slider-btn right" onClick={next}>&gt;</button>
    </div>
  )
}
