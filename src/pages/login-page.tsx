import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { LoginFormData } from "@/type/types";
import { storeToken } from "@/utils/axios-utils";
import { LoginUser } from "@/service/login/login-api";
import Textfield from "@/components/input-field/input-field";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const updateLoginFormData = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      const newToken = data.token;
      storeToken(newToken);
      navigate("/");
      toast.success("User Successfully Logged in");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 401) {
        toast.error("Not Registered. Please check your credentials.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  const handleLoginForm = (formData: LoginFormData) => {
    updateLoginFormData.mutate(formData);
  };

  return (
    <section>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(handleLoginForm)}>
            <Textfield
              name="email"
              label="Email"
              required={false}
              subtype="email"
              register={{
                ...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }),
              }}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.email?.message}</p>
            )}

            <Textfield
              name="password"
              label="Password"
              required={false}
              subtype="password"
              register={{
                ...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }),
              }}
            />
            {errors?.password && (
              <p className="text-red-500 text-sm">
                {errors?.password?.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-colorbuttom text-white py-2 px-4 rounded-md hover:bg-color focus:outline-none "
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-colorbuttom hover:underline">
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
