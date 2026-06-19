# Bus Ticket Booking App (Frontend)

Hệ thống bán vé xe đường dài là một nền tảng đặt vé toàn diện, phục vụ đa dạng các đối tượng người dùng bao gồm: **Hành khách (Passenger)**, **Nhà xe (Operator)**, **Nhân viên soát vé (Staff)** và **Quản trị viên (Admin)**.

## Tính năng nổi bật theo từng vai trò

Hệ thống được thiết kế và tối ưu trải nghiệm người dùng dựa trên cơ chế phân quyền nghiêm ngặt:

### Hệ thống & Xác thực

- **Đăng ký & Đăng nhập:** Cho phép người dùng đăng ký tài khoản mới hoặc đăng nhập bằng JWT (hỗ trợ Access Token và Refresh Token).
- **Phân quyền người dùng (RBAC):** Định tuyến và kiểm soát quyền truy cập chặt chẽ dựa trên 4 nhóm chính: Passenger, Operator, Staff, Admin.
- **Middleware Bảo vệ:** Tự động chặn các truy cập trái phép vào các trang riêng tư (Private Routes) và chuyển hướng người dùng về trang đăng nhập hoặc trang tương ứng với vai trò của họ.

### Dành cho Hành khách (Passenger)

- **Tra cứu chuyến xe:** Tìm kiếm nhanh các chuyến xe đang mở bán theo điểm đi, điểm đến và ngày khởi hành.
- **Xem thông tin chi tiết:** Xem sơ đồ xe (giường nằm/ghế ngồi), vị trí ghế trống, giờ xuất bến và giá vé cơ bản trước khi quyết định đăng nhập để đặt.

- **Đặt vé thông minh (Booking):** Quy trình đặt vé trực quan, chọn tầng (Deck), chọn vị trí ghế trống trên sơ đồ thời gian thực.
- **Thanh toán trực tuyến:** Tích hợp trực tiếp với cổng thanh toán điện tử **VNPay**.
- **Quản lý vé cá nhân:** Danh sách vé đã đặt kèm trạng thái thanh toán (Thành công, Thất bại, Chờ thanh toán).
- **Nhận vé QR Code:** Hiển thị mã QR động cho từng vé để chuẩn bị cho việc soát vé khi lên xe.
- **Trợ lý ảo AI Chatbot:** Cửa sổ chat tích hợp AI (Gemini API) hỗ trợ hỏi đáp, tư vấn chuyến đi bằng ngôn ngữ tự nhiên.

### Dành cho Nhân viên soát vé (Staff)

- **Giao diện Web Mobile tối ưu:** Thiết kế gọn nhẹ phù hợp hiển thị tốt trên các thiết bị di động của nhân viên tại bến.
- **Soát vé bằng QR Code:** Sử dụng camera của thiết bị để quét mã QR trên vé hành khách và kiểm tra trạng thái vé trực tiếp.
- **Nhập vé thủ công:** Nhập mã vé bằng tay trong trường hợp camera không quét được hoặc mã QR bị mờ.
- **Kiểm soát danh sách:** Xem danh sách hành khách và sơ đồ ghế đã đặt trên chuyến xe được phân công.

### Dành cho Nhà xe (Operator)

- **Dashboard vận hành:** Xem thống kê doanh thu theo thời gian, số lượng vé bán ra và tỷ lệ lấp đầy của các chuyến xe.
- **Quản lý loại xe (Bus Type):** Thiết lập sơ đồ xe, số tầng (Deck), số lượng ghế trên mỗi tầng trực quan.
- **Quản lý chuyến đi (Trip):** Tạo mới, chỉnh sửa thông tin chuyến đi, điều chỉnh lộ trình, giờ khởi hành và giá vé.
- **Quản lý nhân viên (Staff):** Tạo tài khoản, phân công nhân viên soát vé phụ trách từng chuyến đi cụ thể.

### Dành cho Quản trị viên (Admin)

- **Thống kê toàn sàn:** Theo dõi doanh số tổng hợp, số lượng đối tác nhà xe tham gia và lượng khách hàng mới đăng ký.
- **Quản lý tài khoản:** Phê duyệt, kích hoạt hoặc vô hiệu hóa (khóa) tài khoản của các nhà xe hoặc người dùng vi phạm quy định.

## Công nghệ sử dụng

- **Framework:** Next.js (sử dụng App Router)
- **Ngôn ngữ:** TypeScript
- **Thư viện UI:** React, RadixUI
- **Styling:** Tailwind CSS
- **Quản lý Trạng thái:** Zustand + TanStack Query
- **Backend:** Kết nối đến một hệ thống backend API riêng biệt. [Github Backend](<[BaotheParo/bus-ticket](https://github.com/BaotheParo/bus-ticket)>)
- **Thư viện vẽ biểu đồ:** Chart.js

## Cấu trúc dự án

```
└── 📁bus-ticket-booking-app
    ├── 📁public              # Chứa các tài nguyên tĩnh (images, icons, svgs,...)
    └── 📁src
        ├── 📁app             # Định tuyến các trang (Routing)
        │   ├── 📁(auth)      # Các trang xác thực (Login, Signup)
        │   ├── 📁(customer)  # Giao diện dành cho hành khách (Tìm vé, Đặt vé, Profile)
        │   ├── 📁operator    # Gia diện dành cho nhà xe (Dashboard quản lý nhà xe)
        │   └── 📁staff       # Giao diện dành cho nhân viên soát vé (check-in, soát vé)
		│   └── 📁admin       # Giao diện dành cho admin (Dashboard quản lý toàn hệ thống)
        ├── 📁assets          # Hình ảnh tĩnh dùng trong ui (background, illustrations,...)
        ├── 📁components      # Các UI component dùng chung
        │   ├── 📁admin
        │   ├── 📁operator
        │   ├── 📁staff
        │   └── 📁ui          # Các component cơ bản (Button, Input, Dialog,...)
        ├── 📁config           # Cấu hình dự án (routes, constants)
        ├── 📁contexts        # React Contexts (Auth, Toast, App)
        ├── 📁hooks           # Custom React Hooks
        ├── 📁lib             # Các hàm tiện ích (utils, axiosClient)
        ├── 📁services        # Các module gọi API (authService, ticketService)
        ├── 📁stores          # Global State Management
        ├── 📁styles          # Global CSS, Tailwind config
        └── 📁types           # Khai báo kiểu dữ liệu TypeScript (Interfaces, Types)
```

## Hướng dẫn cài đặt

### Yêu cầu

- [Node.js](https://nodejs.org/) (phiên bản 18.17.0 trở lên)
- `npm`, `yarn`, hoặc `pnpm`

### Các bước cài đặt

1. **Clone the repository**
2. **Cài đặt các dependencies:**

   ```shell
   npm install
   ```

3. **Thiết lập Biến Môi Trường (Environment Variables):** Tạo một tệp `.env.local` ở thư mục gốc của dự án và thêm các biến cần thiết.

   ```
   # URL trỏ đến API backend của bạn
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

   # (Thêm các biến khác nếu cần)
   ```

4. Chạy Dự Án (Running the Project)

- **Chạy ở chế độ development:** Lệnh này sẽ khởi động server tại `http://localhost:3000` với tính năng Hot-Reload.
  ```shell
  npm run dev
  ```
- **Build dự án cho production:** Lệnh này sẽ tối ưu hóa và build ứng dụng của bạn để sẵn sàng triển khai.
  ```shell
  npm run build
  ```
- **Chạy ở chế độ production:** Lệnh này sẽ khởi động server từ phiên bản đã được build.
  ```shell
  npm run start
  ```

## Giao diện hệ thống

Dưới đây là một số hình ảnh thực tế từ giao diện của hệ thống:

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image4.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033372" class="anchor"></span>Giao diện đăng nhập</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image5.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033476" class="anchor"></span>Giao diện đăng kí</p></figcaption>
</figure>

### Giao diện khách hàng

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image6.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033663" class="anchor"></span>Giao diện tìm kiếm chuyến đi ( Trạng thái chưa có dữ liệu )</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image7.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033664" class="anchor"></span>Giao diện tìm kiếm chuyến đi (Trạng thái tìm thấy chuyến đi phù hợp)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image8.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033665" class="anchor"></span>Giao diện tìm kiếm chuyến đi (Trạng thái không tìm thấy chuyến đi phù hợp)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image9.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033666" class="anchor"></span>Giao diện ChatBox Trợ lý tìm kiếm chuyến đi (Trạng thái sẵn sàng)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image10.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033667" class="anchor"></span>Giao diện ChatBox Trợ lý tìm kiếm chuyến đi (Trạng thái đang giao tiếp)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image11.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033668" class="anchor"></span>Giao diện Đặt vé – Mục Chọn ghế cho 1 chuyến đi (Trạng thái chưa chọn ghế)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image12.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033669" class="anchor"></span>Giao diện Đặt vé – Mục Thông tin khách hàng</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image13.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033670" class="anchor"></span>Giao diện Đặt Vé ( Trạng thái tiến hành chọn ghế - xác nhận thông tin )</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image14.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033671" class="anchor"></span>Giao diện Đặt vé ( Trạng thái xác nhận thanh toán )</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image15.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033672" class="anchor"></span>Giao diện Cổng thanh toán VNPAY sau khi xác nhận thanh toán</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image16.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033673" class="anchor"></span>Giao diện Kết quả đặt vé (Trạng thái thanh toán thành công)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image17.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033674" class="anchor"></span>Giao diện Kết quả đặt vé (Trạng thái Thanh toán thất bại)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image18.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033675" class="anchor"></span>Giao diện thông tin cá nhân</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image19.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033676" class="anchor"></span>Giao diện Vé của tôi – danh sách vé đã đặt</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image20.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033677" class="anchor"></span>Giao diện Vé của tôi – Xem chi tiết vé</p></figcaption>
</figure>

### Giao diện nhân viên

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image21.png" style="width:5.98385in;height:8.54241in" />
<figcaption><p><span id="_Toc216033678" class="anchor"></span>Giao diện Check-in QR Code (Trạng thái sẵn sàng)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image22.png" style="width:5.98385in;height:8.54241in" />
<figcaption><p><span id="_Toc216033679" class="anchor"></span>Giao diện Check-in Mã vé thủ công (Trạng thái sẵn sàng)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image23.png" style="width:5.98385in;height:8.54241in" />
<figcaption><p><span id="_Toc216033680" class="anchor"></span>Giao diện Check-in (Trạng thái vé hợp lệ)</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image24.png" style="width:5.98385in;height:8.54241in" />
<figcaption><p><span id="_Toc216033681" class="anchor"></span>Giao diện Check-in (Trạng thái vé không hợp lệ)</p></figcaption>
</figure>

### Giao diện quản trị của các nhà xe đối tác

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image25.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033682" class="anchor"></span>Giao diện Dashboard của nhà xe</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image26.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033682" class="anchor"></span>Giao diện Quản lý chuyến đi – Danh sách chuyến đi</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image27.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033683" class="anchor"></span>Giao diện Quản lý chuyến đi – Chi tiết chuyến đi</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image28.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033684" class="anchor"></span>Giao diện Quản lý loại xe – Danh sách loại xe</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image29.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033685" class="anchor"></span>Giao diện Quản lý loại xe – Chi tiết loại xe</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image30.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033686" class="anchor"></span>Giao diện Quản lý nhân viên – Danh sách nhân viên</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image31.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033687" class="anchor"></span>Giao diện Quản lý nhân viên – Chi tiết nhân viên</p></figcaption>
</figure>

### Giao diện quản trị của admin

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image32.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033688" class="anchor"></span>Giao diện Quản lý tài khoản hệ thống – Danh sách tài khoản</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image33.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033689" class="anchor"></span>Giao diện Quản lý tài khoản – Chi tiết thông tin tài khoản</p></figcaption>
</figure>

<figure>
<img src="https://raw.githubusercontent.com/duongdonate/bus-ticket-booking-app/master/public/assets/media/image34.png" style="width:6.3in;height:3.34722in" />
<figcaption><p><span id="_Toc216033690" class="anchor"></span>Giao diện Quản lý tài khoản – Xác nhận khóa tài khoản</p></figcaption>
</figure>

## HẠN CHẾ

Do giới hạn về thời gian thực hiện và quy mô của đồ án sinh viên, hệ thống hiện tại vẫn tồn tại một số hạn chế nhất định:

- **Chưa tích hợp hoàn tiền tự động (Auto Refund):** Hiện tại hệ thống chỉ hỗ trợ thanh toán chiều đi (từ Khách hàng -\> VNPay -\> Hệ thống). Chức năng hủy vé mới chỉ ghi nhận trạng thái CANCELLED trên cơ sở dữ liệu, chưa tích hợp API hoàn tiền tự động về tài khoản ngân hàng cho khách.

- **Thiếu thông báo thời gian thực (Real-time Notification):** Chưa áp dụng công nghệ WebSocket để thông báo ngay lập tức cho nhà xe khi có vé mới đặt hoặc thông báo cho hành khách khi chuyến xe bị delay/hủy chuyến (hiện tại phụ thuộc vào việc reload trang hoặc kiểm tra email).

- **Chức năng đánh giá (Review/Rating):** Chưa xây dựng module cho phép hành khách đánh giá chất lượng chuyến đi và thái độ phục vụ của nhà xe sau khi hoàn thành hành trình.

- **Quản lý media hạn chế:** Chưa có hệ thống lưu trữ ảnh chuyên nghiệp (như AWS S3 hay MinIO) để nhà xe upload hình ảnh thực tế của xe và bến bãi. Hiện tại hình ảnh đang sử dụng đường dẫn tĩnh hoặc dữ liệu text.

- **Dữ liệu mô phỏng:** Dữ liệu về các chuyến xe, lộ trình và nhà xe trên hệ thống phần lớn là dữ liệu mẫu (Seed Data), chưa phản ánh đúng độ phức tạp của mạng lưới giao thông thực tế.

## Hướng phát triển trong tương lai

Dựa trên nền tảng công nghệ đã xây dựng (Spring Boot, Redis, Microservices), nhóm đề xuất các hướng phát triển để hoàn thiện sản phẩm:

1.  **Phát triển Ứng dụng Di động (Mobile App):**
    - Xây dựng App dành riêng cho **Tài xế/Nhân viên soát vé** để quét mã QR vé nhanh chóng, thay vì phải sử dụng giao diện Web Mobile như hiện tại.

    - Tích hợp định vị GPS để hành khách theo dõi vị trí xe thời gian thực.

2.  **Nâng cấp Trí tuệ nhân tạo (AI & Recommendation):**
    - Cải tiến Chatbot hiện tại không chỉ trả lời thông tin chuyến xe mà còn có thể gợi ý lịch trình du lịch cá nhân hóa dựa trên lịch sử đặt vé của khách hàng.

    - Sử dụng AI để dự đoán nhu cầu đặt vé vào các dịp lễ tết để nhà xe có kế hoạch tăng cường phương tiện.

3.  **Mở rộng Kiến trúc Microservices:**
    - Hiện tại module AI Chatbot đã được tách riêng chạy bằng Golang. Trong tương lai sẽ tách tiếp các module **Thanh toán (Payment)** và **Đặt vé (Booking)** thành các dịch vụ độc lập để dễ dàng mở rộng (Scale) khi lượng người dùng tăng đột biến.

4.  **Tối ưu hóa Nghiệp vụ:**
    - Tích hợp gửi vé điện tử qua Zalo OA hoặc SMS Brandname để tăng tính tiện dụng.

    - Phát triển cơ chế giá vé linh hoạt (Dynamic Pricing) - tự động tăng giảm giá vé theo cung cầu và thời điểm đặt vé.

5.  **Triển khai thực tế (Deployment):**
    - Chuyển đổi từ môi trường Docker cục bộ sang triển khai trên các nền tảng đám mây (Cloud) như AWS hoặc Google Cloud.
    - Bổ sung thêm cơ chế cân bằng tải (Load Balancing) và giám sát hệ thống tự động.
