import { axiosInstance } from "@/utils/axios-utils";

export const removeBlog = async (_id: string) => {
  const response = await axiosInstance.delete(`/blog/remove/${_id}`);
  return response.data;
};
