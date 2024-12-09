import { RegisterFormData } from "@/type/types";
import { axiosInstance } from "@/utils/axios-utils";

export const registerUser = async (formData: RegisterFormData) => {
  const response = await axiosInstance.post("/register", formData);
  return response?.data;
};
