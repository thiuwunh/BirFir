import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Germany.svg"
        alt="Logo"
        className="footer-logo"
      />
      <div>© 2024 BirFir - Học tiếng Đức cùng cộng đồng</div>
      <div>
        Liên hệ: <a href="mailto:support@birfir.com" style={{ color: '#fff' }}>support@birfir.com</a>
      </div>
    </footer>
  )
}
