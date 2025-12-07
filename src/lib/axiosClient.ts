import axios from "axios";

// 1. Cấu hình chung
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Check môi trường
const isServer = typeof window === "undefined";
if (isServer) {
  console.log("Running on the server side");
} else {
  console.log("Running on the client side");
}

// --- INSTANCE 1: PUBLIC (Dùng cho Login, Signup, Forgot Password) ---
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true", // Dòng quan trọng nhất
    "Content-Type": "application/json",
  },
});

// --- INSTANCE 2: PRIVATE (Dùng cho các API cần quyền) ---
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // Dòng quan trọng nhất
  },
  // withCredentials: true, // Bật dòng này nếu bạn dùng Cookie (HttpOnly) thay vì LocalStorage
});

// -----------------------------------------------------------------------------
// INTERCEPTORS CHO AXIOS PRIVATE
// -----------------------------------------------------------------------------

// A. REQUEST INTERCEPTOR: Tự động gắn Access Token vào Header
axiosPrivate.interceptors.request.use(
  (config) => {
    if (isServer) {
      // Nếu code lỡ chạy trên server, không làm gì cả (vì ko có localStorage)
      return config;
    }
    // Lấy token từ LocalStorage (hoặc Cookie tùy cách bạn lưu)
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // Gắn header theo chuẩn JWT Bearer
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// B. RESPONSE INTERCEPTOR: Xử lý khi Token hết hạn (Lỗi 401)
axiosPrivate.interceptors.response.use(
  (response) => {
    return response; // Nếu API trả về thành công -> Trả về dữ liệu luôn
  },
  async (error) => {
    // Nếu chạy trên server thì reject luôn, không xử lý refresh token
    if (isServer) return Promise.reject(error);

    const originalRequest = error.config;

    // Kiểm tra: Nếu lỗi là 401 (Unauthorized) VÀ request này chưa từng được retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu để không lặp vô tận

      try {
        // 1. Lấy Refresh Token từ storage
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // Không có refresh token -> Bắt buộc logout
          throw new Error("No refresh token available");
        }

        // 2. Gọi API Refresh Token (Dùng axiosPublic để tránh bị interceptor chặn tiếp)
        // Đường dẫn này phải khớp với Controller Spring Boot của bạn
        const response = await axiosPublic.post("/auth/refresh", {
          refreshToken: refreshToken,
        });

        // 3. Lưu token mới vào Storage
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;
        localStorage.setItem("accessToken", newAccessToken);
        // Lưu cả refresh token mới nếu backend có cơ chế "Refresh Token Rotation"
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        // 4. Cập nhật header Authorization cho request bị lỗi lúc nãy
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 5. Thực hiện lại request ban đầu với token mới
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        // Nếu Refresh Token cũng hết hạn hoặc không hợp lệ
        console.error("Refresh token failed:", refreshError);

        // Xóa sạch token cũ
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Có thể thêm bước redirect về trang login nếu cần

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
