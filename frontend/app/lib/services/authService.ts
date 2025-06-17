import { User } from "../contexts/AuhContext";
import { api } from "./api";

interface LoginResponse {
  access_token: string;
  user: User;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    } as LoginRequest);
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    const response = await api.post<User>('/auth/register', {
      name,
      email,
      password,
    } as RegisterRequest);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },
}