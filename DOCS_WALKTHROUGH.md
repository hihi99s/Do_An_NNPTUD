# 📖 Tổng Quan Hệ Thống MedicalBooking Y-Tế-Số

Hệ thống được xây dựng theo mô hình **SPA (Single Page Application)** kết hợp với **Role-Based Access Control (RBAC)**, chia làm 3 phân hệ người dùng chính: **Bệnh nhân (Patient)**, **Bác sĩ (Doctor)** và **Quản trị viên (Admin)**.

---

## 1. Danh Sách Chức Năng Chi Tiết

### 🔐 Hệ Thống Cốt Lõi (Core)
- **Đăng ký/Đăng nhập:** Hỗ trợ đăng ký tài khoản Bệnh nhân mặc định.
- **Mock Google Login:** Mô phỏng luồng đăng nhập nhanh bằng Google (SSO) để tăng điểm trải nghiệm người dùng.
- **Phân quyền (RBAC):** Tự động điều hướng và bảo vệ trang nội bộ dựa trên Role (Admin/Doctor/Patient).
- **Navbar Động:** Menu tự động thay đổi (Đăng nhập/Đăng ký ↔ Khu vực cá nhân/Đăng xuất) tùy theo trạng thái session.

### 🏠 Trang Chủ & Tìm Kiếm (`index.html`)
- **Banner Carousel:** Hiển thị quảng cáo/tin tức động lấy từ Database.
- **Lưới Avatar Bác Sĩ:** Hiển thị danh sách bác sĩ kèm chuyên khoa và đánh giá.
- **Bộ lọc thông minh:** Tìm kiếm bác sĩ theo Tên hoặc Triệu chứng bệnh.
- **Điều hướng nhanh:** Nút Xem hồ sơ và Đặt lịch trực tiếp trên card bác sĩ.

### 👤 Hồ Sơ Bác Sĩ (`profile.html`)
- **Thông tin chi tiết:** Hiển thị thâm niên, phí dịch vụ, giới thiệu chuyên môn.
- **Bảng Đánh Giá:** Hiển thị các nhận xét thật từ bệnh nhân đã khám.
- **Lịch Trực:** Hiển thị các khung giờ còn trống hoặc đã hết chỗ của bác sĩ đó.
- **Quản lý Profile (Chỉ Bác sĩ):** Cho phép bác sĩ tự sửa thông tin cá nhân và **Cập nhật ảnh đại diện (Upload)**.

### 📅 Hệ Thống Đặt Lịch (`booking.html`)
- **Chọn Bác Sĩ:** Tự động chọn sẵn nếu đi từ trang Profile.
- **Quét Lịch Thời Gian Thực:** Hiển thị các Slot xanh (trống) và đỏ (hết chỗ).
- **Chống Trùng Lịch:** Logic Backend ngăn chặn 1 bệnh nhân đặt trùng khung giờ hoặc 2 người đặt cùng 1 slot.

### 🩺 Phân Hệ Bác Sĩ (`doctor.html`)
- **Hàng Chờ Đợi Khám:** Tiếp nhận bệnh nhân, xem triệu chứng họ đã nhập.
- **Bệnh Án Điện Tử (EMR):** Nhập chẩn đoán và kê đơn thuốc, ký xác nhận hoàn tất ca khám.
- **Quản Lý Lịch Trực Nâng Cao:**
    - **Preset Slots:** Chọn nhanh các khung giờ hành chính (chọn nhiều slot 1 lúc).
    - **Custom Slots:** Nhập khung giờ tự do.
    - **Xóa ca trực:** Thu hồi khung giờ nếu chưa có khách đặt.

### 📋 Phân Hệ Bệnh Nhân (`dashboard.html`)
- **Lịch Hẹn Của Tôi:** Theo dõi trạng thái ca khám (Pending/Completed/Cancelled).
- **Hủy Lịch Hẹn:** Hủy các ca chờ khám để giải phóng khung giờ cho bác sĩ.
- **Thanh Toán Mockup (VietQR):** Hiển thị QR Code thanh toán viện phí mô phỏng.
- **Xem Kết Quả:** Đọc bệnh án/đơn thuốc sau khi bác sĩ khám xong.
- **Đánh Giá 5 Sao:** Gửi nhận xét và chấm điểm cho bác sĩ.

### ⚙️ Phân Hệ Admin (`admin.html`)
- **Quản Lý Nhân Sự:** Tạo tài khoản Bác sĩ/Admin mới kèm **Upload ảnh đại diện**.
- **Quản Lý Chuyên Khoa:** Thêm mới/Chỉnh sửa các khoa (Nội, Ngoại, Nhi...).
- **Quản Lý Marketing:** Thay đổi ảnh Banners trên trang chủ.

---

## 2. Luồng Hoạt Động (Workflows)

### 🔄 Luồng Bệnh Nhân (Patient Journey)
1. **Truy cập** -> **Tìm kiếm bác sĩ** -> **Xem Profile** để chọn đúng người.
2. **Đặt lịch:** Chọn khung giờ còn trống -> Nhập triệu chứng.
3. **Theo dõi:** Vào Dashboard xem lịch đã được xác nhận chưa.
4. **Khám:** Bác sĩ khám xong, trạng thái chuyển sang `COMPLETED`.
5. **Hoàn tất:** Bệnh nhân xem **Bệnh án** -> **Thanh toán** -> **Đánh giá** chất lượng.

### 🩺 Luồng Bác Sĩ (Doctor Workflow)
1. **Thiết lập:** Login -> Vào Profile cập nhật ảnh, thâm niên và bio.
2. **Lên lịch:** Vào Tab "Tạo Khung Lịch" -> Chọn nhanh các giờ hành chính 30p mỗi ca.
3. **Tiếp đón:** Thấy bệnh nhân mới hiện ở Tab "Hàng chờ".
4. **Kết luận:** Bấm khám -> Nhập EMR (Thuốc/Bệnh) -> Gửi kết quả (Lịch tự động đóng lại).

### 🛡️ Luồng Admin (Admin Control)
1. **Khởi tạo:** Setup các Chuyên khoa chính của bệnh viện.
2. **Tuyển dụng:** Tạo tài khoản cho Bác sĩ, cấp phát Password và gán vào Khoa.
3. **Vân hành:** Upload banner khuyến mãi để bệnh nhân thấy ở trang chủ.

---
🏥 **Bản Quyền MedicalBooking Y-TẾ-SỐ © 2026**
