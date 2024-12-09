
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const authToken = localStorage.getItem("Token");

  return authToken ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default ProtectedRoute;
