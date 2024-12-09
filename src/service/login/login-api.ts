import { LoginFormData } from "@/type/types";
import { axiosInstance } from "@/utils/axios-utils";

export const LoginUser = async (formData: LoginFormData) => {
  const response = await axiosInstance.post("/auth", formData);
  return response?.data;
};
