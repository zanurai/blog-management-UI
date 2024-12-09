import { axiosInstance } from "@/utils/axios-utils";

export const updateBlog = async (
  id: string,
  title: string,
  description: string
) => {
  try {
    const response = await axiosInstance.put(`/blog/update/${id}`, {
      title,
      description,
    });
    return response.data; // Return the updated blog data or any response you need
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Rethrow the error to be caught by mutation or handler
  }
};
