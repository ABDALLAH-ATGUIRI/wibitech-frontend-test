import api from "@/lib/axios";

export const getUsers = async () => {

  try {
    const response = await api.get("/users");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
