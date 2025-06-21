import api from "@/lib/axios";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>(
      "/login",
      { username, password },
      { withCredentials: true }
    );

    const { token, user } = response.data;

    // Optional: store token and user data
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
      status: error?.status || 500,
    };
  }
};
