import { BlogCreateFormProps } from "@/type/types"
import { axiosInstance } from "@/utils/axios-utils"

export const createBlogApi = async( formData: BlogCreateFormProps ) => {
    const response = await axiosInstance.post("/blog/create", formData);
    console.log("responsllle", response);
    return response.data;

}