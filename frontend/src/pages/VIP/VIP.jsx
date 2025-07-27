import './VIP.css'

export default function VIP() {
  return (
    <div className="container vip-center">
      <div className="container-title">Trang VIP</div>
      <div>Trang hiện tại đang cập nhật.<br />Cảm ơn bạn đã quan tâm và ủng hộ!</div>
      <div className="vip-img-wrapper">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
          alt="Donate"
          className="vip-img"
        />
      </div>
    </div>
  )
}