import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || " Failed to register");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;

    localStorage.setItem("authToken", token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to login");
  }
};
export const logout = () => {
  localStorage.removeItem("authToken");
};
