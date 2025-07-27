import React from 'react'
import './Error.css'

export default function Error() {
  return (
    <div className="error-container">
        <h1 className="error-title">404 - Not Found</h1>
        <p className="error-description">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
        <img src="https://cloud.z.com/vn/wp-content/uploads/2023/04/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450-1.jpg"></img>
    </div>
  )
}