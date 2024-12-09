import { axiosInstance } from "@/utils/axios-utils"

export const blogList = async() => {
    const response = await axiosInstance.get("/blog/list")
    return response.data;
}