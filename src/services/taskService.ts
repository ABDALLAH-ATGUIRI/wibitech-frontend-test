import api from "@/lib/axios";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error,
      status: error?.status || 500,
    };
  }
};

export const createTask = async (task: any) => {
  try {
    const response = await api.post("/tasks", task);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error,
      status: error?.status || 500,
    };
  }
};

export const updateTask = async (taskId: number, task: any) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, task);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error,
      status: error?.status || 500,
    };
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error,
      status: error?.status || 500,
    };
  }
};
