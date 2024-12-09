import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { BlogCreateFormProps } from "@/type/types";
import { blogList } from "@/service/create-blogapi/blog-list-api";
import { removeBlog } from "@/service/create-blogapi/remove-blog-api";
import { getBlogApiById } from "@/service/create-blogapi/get-blog-api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [expandedBlogIndex, setExpandedBlogIndex] = useState<number | null>(
    null
  );
  const [blogs, setBlogs] = useState<BlogCreateFormProps[]>([]);

  const toggleReadMore = (index: number) => {
    setExpandedBlogIndex(expandedBlogIndex === index ? null : index);
  };

  const blogListData = useMutation({
    mutationFn: blogList,
    onSuccess: (data: BlogCreateFormProps[]) => {
      setBlogs(data);
    },
    onError: () => {},
  });

  useEffect(() => {
    blogListData.mutate();
  }, []);

  const blogRemove = useMutation({
    mutationFn: removeBlog,
    onSuccess: (data, id) => {
      toast.success(data?.message);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    },
    onError: () => {},
  });

  const handleRemoveBlog = (id: string) => {
    console.log("Removing blog with ID:", id);
    blogRemove.mutate(id);
  };

  const getBlogById = useMutation({
    mutationFn: getBlogApiById,
    onSuccess: (data) => {
      navigate(`/blog-update/${data._id}`, { state: data });
    },
    onError: () => {},
  });

  const handleClickUpdate = (id: string) => {
    getBlogById.mutate(id);
  };

  return (
    <section className="container  py-4 px-1">
      <div className="flex justify-between mb-6 ">
        <h1 className="text-2xl font-bold max-sm:text-[25px]">Blog List</h1>
        <Link to="/blog-create">
          <button className="max-sm:text-[14px] px-4 py-2 bg-colorbuttom text-white rounded-lg hover:bg-color">
            Create New Blog
          </button>
        </Link>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length > 0 ? (
          blogs?.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-300 border border-slate-300 p-4 rounded-lg shadow-sm hover:bg-transparent"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {expandedBlogIndex === index
                  ? blog.description
                  : blog.description.length > 100
                  ? `${blog.description.slice(0, 100)}...`
                  : blog.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-blue-500 hover:underline"
                >
                  {expandedBlogIndex === index ? "Read Less" : "Read More"}
                </button>
                <div className="flex items-center space-x-4 cursor-pointer text-[17px]">
                  <MdModeEditOutline
                    className="text-green-500"
                    onClick={() => handleClickUpdate(blog._id as string)}
                  />

                  <MdDelete
                    className="text-red-500"
                    onClick={() => handleRemoveBlog(blog._id as string)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=" text-center">
            <p className="text-gray-500 text-2xl font-bold">
              No blogs available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
