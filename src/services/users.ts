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
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
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
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data?.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
