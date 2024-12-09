import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { LogoutUser } from "@/service/logout/logout-api";
import { removeTokenFormStorage } from "@/utils/axios-utils";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsAuthenticated(!!token);
  }, []);

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/sign-up");
  };

  const handleLogin = () => {
    navigate("/sign-in");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const updateLogout = useMutation({
    mutationFn: LogoutUser,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsAuthenticated(false);
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const handleClickLogout = () => {
    updateLogout.mutate();
    removeTokenFormStorage();
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  return (
    <div className="bg-slate-300 sticky top-0 z-[100]">
      <div className="container  py-4 px-1">
        <section>
          <div className="flex justify-between items-center max-sm:flex-wrap">
            <div>
              <h1
                className="flex items-center font-poppins font-bold justify-center text-3xl max-sm:text-2xl text-white px-2 py-1 rounded-md bg-colorbuttom cursor-pointer"
                onClick={handleClickLogo}
              >
                BMG
              </h1>
            </div>
            <div className="flex items-center space-x-4 max-sm:space-x-2">
              {isAuthenticated ? (
                <>
                  <button
                    className="max-sm:text-[15px] max-sm:px-5 px-6 py-2 bg-colorbuttom text-white font-semibold rounded-lg shadow-md hover:bg-color focus:outline-none"
                    onClick={handleProfile}
                  >
                    Profile
                  </button>
                  <button
                    className="max-sm:text-[15px] max-sm:px-5 px-6 py-2 bg-indigo-100 text-black font-semibold rounded-lg shadow-md hover:bg-indigo-200 focus:outline-none"
                    onClick={handleClickLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="max-sm:text-[15px] max-sm:px-5 px-6 py-2 bg-colorbuttom text-white font-semibold rounded-lg shadow-md hover:bg-color focus:outline-none"
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                  <button
                    className="max-sm:text-[15px] max-sm:px-5 px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
