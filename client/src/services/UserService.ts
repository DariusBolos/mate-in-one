import axios from "axios";
import { User } from "../types/User";
import { toast } from "sonner";
import { LoginResponse } from "@/types/LoginResponse";

const apiUrl = import.meta.env.VITE_API_URL;
const appUrl = import.meta.env.VITE_APP_URL;

const authUrl = `${apiUrl}/auth`;
const userUrl = `${apiUrl}/user`;

async function saveUser(user: User) {
  await axios
    .post(`${authUrl}/register`, user)
    .then((response) => {
      toast.success(response.data);
      setTimeout(() => window.location.replace(`${appUrl}/login`), 1500);
    })
    .catch((error) => toast.error(error.response.data));
}

async function validateUserCredentials(email: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(`${authUrl}/login`, {
      email,
      password,
    });

    const { token, message } = response.data;
    localStorage.setItem("token", token);
    toast.success(message);

    return token;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Login failed.");
    throw error;
  }
}

async function getUserDetails(): Promise<User | null> {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Login to get user details.");
    return null;
  }

  try {
    const response = await axios.get<User>(`${userUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "User fetch failed.");
    return null;
  }
}

async function updateUser(
  userId: string,
  updates: Partial<User>
): Promise<User | null> {
  if (
    updates.email &&
    (!updates.email.includes("@") || !updates.email.includes("."))
  ) {
    toast.error("Email is invalid.");
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Login to update user details.");
    return null;
  }

  try {
    const response = await axios.put<User>(`${userUrl}/${userId}`, updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "User update failed.");
    return null;
  }
}

async function deleteUser(userId: string): Promise<boolean> {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Login to delete user.");
    return false;
  }

  try {
    const response = await axios.delete(`${userUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 204) {
      return true;
    }

    toast.error("Unexpected response status.");
    return false;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "User deletion failed.";
    toast.error(errorMessage);
    return false;
  }
}

export {
  saveUser,
  updateUser,
  deleteUser,
  validateUserCredentials,
  getUserDetails,
};
