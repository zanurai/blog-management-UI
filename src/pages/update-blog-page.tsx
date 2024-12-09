import toast from "react-hot-toast";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { updateBlog } from "@/service/create-blogapi/update-blog-api";

const BlogUpdate: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");

  const updateBlogData = useMutation({
    mutationFn: (data: { id: string; title: string; description: string }) =>
      updateBlog(data.id, data.title, data.description),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error updating blog:", error);
    },
  });

  const handleClickUpdateBlog = () => {
    if (id) {
      updateBlogData.mutate({ id, title, description });
      console.log("Blog updated:", { id, title, description });
    }
  };

  return (
    <section>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
        <h1 className="max-sm:text-2xl text-3xl font-bold text-center text-gray-700 mb-6">
          Update Blog
        </h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();

            handleClickUpdateBlog();
          }}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Enter blog description"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-colorbuttom text-white font-semibold rounded-md shadow-md hover:bg-color focus:outline-none"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogUpdate;
