import { Role } from "@/types/Role";

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: Role[];
  // Thêm các field khác nếu cần
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  error: string;
}
