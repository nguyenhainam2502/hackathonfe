# Sơ đồ ERD - FlightBooker

## Entities & Relationships

```mermaid
erDiagram
    Users {
        string id PK
        string username
        string email
        string password_hash
        timestamp created_at
        timestamp updated_at
    }

    Flights {
        string id PK "VJ123"
        string carrier "Vietjet Air"
        string depart_code "SGN"
        string arrive_code "HAN" 
        time depart_time "20:30"
        time arrive_time "22:35"
        string duration "2h05m"
        string cabin_class "Phổ thông"
        decimal price "1500000"
        int available_seats
        timestamp created_at
    }

    Bookings {
        string pnr PK "6 chars"
        string flight_id FK
        string user_id FK "optional"
        string status "CONFIRMED|PENDING|CANCELLED"
        decimal total_amount
        timestamp created_at
        timestamp updated_at
    }

    Passengers {
        string id PK
        string booking_id FK
        string first_name
        string last_name
        date date_of_birth
        string gender
        string email
        string phone
    }

    BookingAddons {
        string id PK
        string booking_id FK
        string type "SEAT|BAGGAGE"
        string seat_code "24A - if type=SEAT"
        int baggage_kg "20 - if type=BAGGAGE"
        decimal price
    }

    Payments {
        string id PK
        string booking_id FK
        decimal amount
        string method "CARD|WALLET|BANK"
        string status
        timestamp created_at
    }

    Airports {
        string code PK "SGN"
        string name "Tân Sơn Nhất"
        string city "TP.HCM"
        string country "Việt Nam"
    }

    Users ||--o{ Bookings : "đặt"
    Flights ||--o{ Bookings : "chứa"
    Bookings ||--|{ Passengers : "có"
    Bookings ||--o{ BookingAddons : "thêm"
    Bookings ||--o{ Payments : "thanh toán"
    Airports ||--o{ Flights : "khởi hành"
    Airports ||--o{ Flights : "đến"
```

## Giải thích quan hệ

1. User (Người dùng)
- Có thể đặt nhiều Booking
- Booking có thể không có User (khách vãng lai)

2. Flight (Chuyến bay)
- Một Flight có nhiều Booking
- Flight có điểm đi/đến là Airports
- Lưu giá vé cơ bản, hạng ghế, số ghế còn

3. Booking (Đặt chỗ)
- Có một Flight
- Có một hoặc nhiều Passenger
- Có các Addon tùy chọn (ghế, hành lý)
- Có các Payment ghi nhận thanh toán
- Có PNR là mã định danh unique
- Có status theo trạng thái xử lý

4. Passenger (Hành khách)
- Thuộc về một Booking
- Lưu thông tin cá nhân để xuất vé

5. BookingAddon (Dịch vụ thêm)
- Thuộc về một Booking
- Có thể là chọn ghế hoặc mua thêm hành lý
- Mỗi loại có thông tin riêng (mã ghế/số kg)
- Có giá tiền riêng

6. Payment (Thanh toán)
- Thuộc về một Booking
- Ghi nhận phương thức và trạng thái
- Có thể có nhiều lần thanh toán

7. Airport (Sân bay)
- Là điểm đi/đến của Flight
- Mã sân bay là unique (3 ký tự)

## Ghi chú
- Giá vé cuối = Flight.price + sum(BookingAddons.price)
- PNR dùng để tra cứu booking
- Có thể thêm bảng cho khuyến mãi, phụ thu, thuế... nếu cần
- Nên có timestamps để audit
- Status nên dùng ENUM trong DB
