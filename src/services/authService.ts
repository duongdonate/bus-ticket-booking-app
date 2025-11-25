import { axiosPublic, axiosPrivate } from "@/lib/axiosClient";
import { User, AuthResponse } from "@/types/User";

export const authApi = {
  signup: (data: any) => axiosPublic.post<User>("/auth/signup", data),

  signin: (data: any) => axiosPublic.post<AuthResponse>("/auth/signin", data),

  getMe: () => axiosPrivate.get<User>("/auth/me"),
};
