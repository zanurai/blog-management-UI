import { axiosInstance } from "@/utils/axios-utils"

export const updateProfile = async (data: { name: string; profileImage?: string }) => {
  const response = await axiosInstance.put("/profile", data);
  return response.data;
};