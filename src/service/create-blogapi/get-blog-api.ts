
import { axiosInstance } from "../../utils/axios-utils";

export const getBlogApiById = async (_id: string) => {
  const response = await axiosInstance.get(`/blog/blog/${_id}`);
  return response.data;
};
