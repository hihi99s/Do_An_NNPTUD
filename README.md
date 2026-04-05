# 🏥 MedicalBooking - Hệ Thống Đặt Lịch Khám Y Tế Thông Minh

![Banner](https://images.pexels.com/photos/4056812/pexels-photo-4056812.jpeg?auto=compress&cs=tinysrgb&w=1600)

## 🌟 Giới Thiệu
**MedicalBooking** là một nền tảng quản lý và đặt lịch khám bệnh trực tuyến toàn diện, giúp kết nối bệnh nhân với các y bác sĩ chuyên khoa một cách nhanh chóng và chính xác. Hệ thống được thiết kế với giao diện hiện đại, tối ưu hóa trải nghiệm người dùng (UX/UI) và tích hợp các tính năng tự động hóa quy trình y tế.

---

## 🚀 Các Tính Năng Nổi Bật

### 🔐 Bảo Mật & Phân Quyền (RBAC)
- Đăng nhập/Đăng ký với 3 vai trò: **Bệnh nhân (PATIENT)**, **Bác sĩ (DOCTOR)**, **Quản trị viên (ADMIN)**.
- Mô phỏng đăng nhập nhanh bằng **Mock Google OAuth2**.
- Tự động điều hướng và bảo vệ các trang chức năng theo quyền hạn.

### 🏠 Trang Chủ & Tìm Kiếm
- Banner quảng cáo động (Carousel).
- Tìm kiếm bác sĩ thông minh theo **Họ Tên** hoặc **Triệu chứng**.
- Hiển thị danh sách bác sĩ kèm chuyên khoa, đánh giá sao và lượt nhận xét.

### 👤 Profile Bác Sĩ Chuyên Sâu
- Hiển thị thâm niên, giá khám, giới thiệu chuyên môn và lịch trực khả dụng.
- Bác sĩ có thể **Tự quản lý hồ sơ**, cập nhật thông tin cá nhân và **Ảnh đại diện** trực tiếp.

### 📅 Hệ Thống Đặt Lịch (Booking Engine)
- Hiển thị mảng khung giờ theo thời gian thực (Xanh = Trống, Đỏ = Hết chỗ).
- **Chống trùng lịch:** Ngăn chặn việc đặt trùng khung giờ giữa các bệnh nhân hoặc trùng lịch của chính mình.

### 🧬 Dashboard Bác Sĩ (Doctor Workspace)
- Quản lý hàng chờ bệnh nhân thuận tiện.
- Cấp **Bệnh án điện tử (EMR)**: Chẩn đoán & Kê đơn thuốc tại chỗ.
- Quản lý ca trực linh hoạt: Chọn nhanh khung giờ hành chính hoặc nhập ca tùy chỉnh.

### 📋 Dashboard Bệnh Nhân (Patient Control)
- Quản lý lịch khám: Theo dõi trạng thái, hủy lịch nếu cần.
- **Thanh toán viện phí:** Tích hợp mô phỏng thanh toán qua **VietQR**.
- Xem kết quả khám ngay sau khi bác sĩ ký số.
- Đánh giá chất lượng dịch vụ (Rating & Comment).

---

## 🛠️ Công Nghệ Sử Dụng

- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ODM).
- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (Styling).
- **Storage:** Multer (Xử lý upload ảnh Local).
- **UI/UX:** Icons từ Flaticon, Fonts từ Google Fonts.

---

## 📦 Hướng Dẫn Cài Đặt & Chạy Thử

### 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (v14+).
- Đã cài đặt và đang chạy **MongoDB Community Server**.

### 2. Cài đặt các thư viện
Mở Terminal tại thư mục gốc của dự án và chạy lệnh:
```bash
npm install
```

### 3. Nạp dữ liệu mẫu (Seed Data)
Để hệ thống có sẵn danh sách bác sĩ và các khung giờ khám để test, hãy chạy 2 lệnh sau:
```bash
# Nạp danh sách 13 bác sĩ chuyên khoa
node seed-doctors.js

# Tự động sắp lịch trực cho toàn bộ bác sĩ trong 3 ngày tới
node seed-schedules.js
```

### 4. Khởi chạy ứng dụng
```bash
npm run dev
```
Truy cập: `http://localhost:3000`

---

## 🔑 Tài Khoản Demo (Test Accounts)

| Role | Username | Password |
|---|---|---|
| **Bác Sĩ** | `doctor_6096_0` | `123` |
| **Quản Trị** | `admin` | `123` |
| **Bệnh Nhân** | `aa` | `123` |

---

## 📧 Liên Hệ & Bản Quyền
- **Dự án:** Đồ án Môn học Ngôn Ngữ Phát Triển Ứng Dụng.
- **Bản quyền:** © 2026 MedicalBooking Team.

---
🏥 *Hệ thống mang lại sự tiện lợi tối đa cho sức khỏe cộng đồng!*
