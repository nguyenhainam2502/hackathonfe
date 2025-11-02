## FlightBooker FE - Báo cáo tổng quan mã nguồn

Ngày tạo: 2025-11-02

Tóm tắt: frontend React + Vite cho một ứng dụng đặt vé máy bay (FlightBooker). Giao diện tối (dark) với Tailwind CSS, các route cơ bản, và một service axios để gọi API backend.

1) Kỹ thuật & phụ thuộc chính
- Node / npm + Vite (dev/build)
- React 18 + react-router-dom v6
- TypeScript
- Tailwind CSS (+ @tailwindcss/forms)
- Axios để gọi API

Các dependency và script chính (xem `package.json`):
- scripts: `dev` (vite), `build` (tsc -b && vite build), `preview` (vite preview)

2) Cấu trúc thư mục quan trọng
- `src/` — mã nguồn chính
  - `src/main.tsx` — entry, mount React
  - `src/App.tsx` — router + header
  - `src/pages/` — các trang (SearchFlights, Checkout, ManageBookings, TicketDetails, Login, Register)
  - `src/components/` — các component tái sử dụng (FormField, ClockWidget, ...)
  - `src/services/api.ts` — client axios cho các API (login, register, searchFlights, getBookingByPNR, createBooking, getTicket)
  - `src/index.css` — Tailwind base + component utilities (card-dark, field-dark, btn-primary...)
  - `src/env.d.ts` — khai báo kiểu ImportMetaEnv (VITE_API_BASE)

3) Các tính năng chính / flows
- Tìm kiếm chuyến bay (SearchFlights)
  - Form tìm (điểm đi/đến, ngày đi, ngày về, số người)
  - Gọi `searchFlights` từ `src/services/api.ts`
  - Hiển thị danh sách chuyến và nút `Chọn` dẫn tới `/checkout` kèm state flight

- Thanh toán / thông tin hành khách (Checkout)
  - Nhập thông tin hành khách (họ, tên, ngày sinh, giới tính, email, điện thoại)
  - Dịch vụ bổ sung: chọn ghế, hành lý ký gửi (0/20kg)
  - Chọn phương thức thanh toán (card / wallet / bank)
  - Gửi payload tới `createBooking` (flightId, passenger, addons, payMethod)
  - Sau khi tạo booking chuyển tới `/ticket/:pnr`

- Tra cứu đặt chỗ (ManageBookings)
  - Tìm theo PNR (gọi `getBookingByPNR`)
  - Hiển thị bảng kết quả (status badges: CONFIRMED, PENDING, CANCELLED)

- Đăng nhập / Đăng ký
  - `Login` gọi `login(username,password)`
  - `Register` gọi `register(payload)`

- Ticket detail (TicketDetails) — route `/ticket/:pnr` (chi tiết vé) (file present in repo)

4) API endpoints (theo `src/services/api.ts`)
- POST /auth/login  -> login
- POST /auth/register -> register
- GET  /flights/search -> searchFlights (params: from, to, departDate, returnDate, adults, tripType)
- GET  /bookings/:pnr -> getBookingByPNR
- POST /bookings -> createBooking (payload shown ở Checkout)
- GET  /tickets/:pnr -> getTicket

5) Kiến trúc, kiểu dữ liệu và contract nhỏ
- Flight (shape used in pages): { id, carrier, cabin?, depart, arrive, departTime, arriveTime, duration, price }
- Booking payload (from Checkout): { flightId, passenger, addons: { seat?, baggageKg }, payMethod }
- ImportMeta env: VITE_API_BASE (baseURL for axios) — khai báo trong `src/env.d.ts`

6) Các component quan trọng & nhiệm vụ
- `FormField.tsx` — wrapper label + slot (dùng cho form consistency)
- `ClockWidget.tsx` — widget hiển thị ngày giờ ở góc (dùng cho dev/demo)
- Reusable Tailwind classes in `index.css`: `.card-dark`, `.field-dark`, `.btn-primary`, `.section-title`, `.muted`

7) Theme / style
- Tailwind config mở rộng `primary` color, background-light/dark và font family `Manrope`.
- Dark mode class-based (`darkMode: 'class'`).

8) Cách chạy dự án (local)
1. cài dependencies: `npm install`
2. tạo `.env` (ví dụ `VITE_API_BASE=http://localhost:8000/api`)
3. dev server: `npm run dev`
4. build: `npm run build`

9) Ghi chú kỹ thuật & khuyến nghị
- Kiểm tra `VITE_API_BASE` để trỏ tới backend thật khi test end-to-end.
- API trả lỗi cần bắt rõ hơn trong services (trả về shape chuẩn) để FE hiển thị error messages.
- Việc mock trong các trang (trường hợp backend không có) là tiện cho demo — phải remove hoặc detect env khi deploy.
- Thêm unit tests / E2E (Vitest / Playwright) nếu cần Q/A trước hackathon demo.

10) Next steps đề xuất
- Hoàn thiện `TicketDetails` để hiển thị dữ liệu thực từ `getTicket`.
- Thêm xác thực route cho trang quản lý nếu cần (JWT / session).
- Viết script seed demo hoặc mock server (json-server) để test flows offline.

-- Kết thúc báo cáo
