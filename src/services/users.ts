import { api } from '@/middlewares/api';

export interface User {
  id: string;
  name: string;
  companions: {
    confirmation: boolean;
    name: string;
  }[];
  phone: string;
  confirmation: boolean;
}

export async function getUser(id: string) {
  try {
    const { data } = await api.get(`/users/${id}`);
    if (data?.success) {
      return data?.data as User;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function updateUser(id: string, payload: User) {
  try {
    const { data } = await api.put(`/confirmate/${id}`, payload);
    if (data?.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
