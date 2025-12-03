import { Role } from "@/types/Role";

// 2. Định nghĩa cấu trúc Rule
interface RouteRule {
  path: string;
  roles?: Role[]; // Nếu null hoặc mảng rỗng -> Yêu cầu login nhưng role nào cũng được
  isPublic?: boolean; // Nếu true -> Không cần login
}

// 3. Bảng cấu hình Routes
export const Routes: RouteRule[] = [
  // --- Public Routes ---
  { path: "/login", isPublic: true },
  { path: "/signup", isPublic: true },
  // --- Admin Routes (Bao gồm cả trang con như /admin/users) ---
  { path: "/", isPublic: true },
  // --- Passenger Routes ---
  { path: "/trips", isPublic: true },
  // --- User chung (Chỉ cần login là vào được, ví dụ trang profile) ---
  { path: "/profile", roles: [] },
  { path: "/staff/check-in", isPublic: true },
  { path: "/admin", isPublic: true },
  { path: "/operator", isPublic: true },
];
