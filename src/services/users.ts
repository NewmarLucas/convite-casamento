interface User {
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
