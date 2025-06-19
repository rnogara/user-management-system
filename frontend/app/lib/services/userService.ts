import { User } from "../contexts/AuhContext";
import { api } from "./api";

interface UpdateUserRequest {
  name?: string;
  password?: string;
  currentPassword?: string;
  role?: 'admin' | 'user';
}

interface UpdateProfileRequest {
  name?: string;
  password?: string;
  currentPassword?: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export const userService = {
  async getAllUsers(params?: {
    role?: string;
    sortBy?: string;
    order?: string;
  }): Promise<User[]> {
    const response = await api.get<User[]>('/users', { params });
    return response.data;
  },

  async getUserById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  async getInactiveUsers(days?: number): Promise<User[]> {
    const response = await api.get<User[]>('/users/inactive', { params: { days } });
    return response.data;
  },
};