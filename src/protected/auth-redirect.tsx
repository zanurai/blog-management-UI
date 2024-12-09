
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthRedirect: React.FC= () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (
      token &&
      (location.pathname === "/sign-in" || location.pathname === "/sign-up")
    ) {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return <Outlet />;
};

export default AuthRedirect;
