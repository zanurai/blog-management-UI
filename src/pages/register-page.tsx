import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

import { RegisterFormData } from "@/type/types";
import { storeToken } from "@/utils/axios-utils";
import Textfield from "@/components/input-field/input-field";
import { registerUser } from "@/service/register/register-api";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const updateRegisterForm = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const newToken = data.token;
      storeToken(newToken);
      navigate("/");
      toast.success("User Successfully Registered");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: () => {
      toast.error("An error occurred during registration.");
    },
  });

  const submitHandler = (formData: RegisterFormData) => {
    updateRegisterForm.mutate(formData);
  };

  return (
    <section>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <Textfield
              name="name"
              label="Name"
              required={false}
              subtype="text"
              register={{
                ...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[\w\s]+$/,
                    message: "Name is not valid",
                  },
                }),
              }}
            />
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors?.name?.message}</p>
            )}

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

            <div>
              <Textfield
                name="confirmPassword"
                label="Confirm Password"
                required={false}
                subtype="password"
                register={register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors?.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 bg-colorbuttom text-white font-semibold rounded-md hover:bg-color focus:outline-none "
            >
              Sign Up
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-colorbuttom hover:underline"
                >
                  sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
