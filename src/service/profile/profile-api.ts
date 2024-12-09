import { axiosInstance } from "@/utils/axios-utils";

export const getProfileData = async () => {
  const response = await axiosInstance.get("/profile");
  return response?.data;
};
