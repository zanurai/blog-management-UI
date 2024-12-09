import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { BlogCreateFormProps } from "@/type/types";
import { createBlogApi } from "@/service/create-blogapi/create-blog-api";

const BlogCreate: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createBlogData = useMutation({
    mutationFn: createBlogApi,
    onSuccess: (data) => {
      navigate("/");
      toast.success(data.message || "Blog created successfully!");
    },
    onError: (error) => {
      console.error("Error creating blog", error);
    },
  });

  const handleClickCreateBlog = () => {
    const formData: BlogCreateFormProps = {
      title,
      description,
    };

    createBlogData.mutate(formData);
  };

  return (
    <section>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
        <h1 className="max-sm:text-2xl text-3xl font-bold text-center text-gray-700 mb-6">
          Create a New Blog
        </h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickCreateBlog();
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
              required
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
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-colorbuttom text-white font-semibold rounded-md shadow-md hover:bg-color focus:outline-none"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogCreate;
