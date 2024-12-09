import { axiosInstance } from "@/utils/axios-utils";

export const LogoutUser = async() => {
    const response = await axiosInstance.post("/logout");
    
    return response?.data
    
};
