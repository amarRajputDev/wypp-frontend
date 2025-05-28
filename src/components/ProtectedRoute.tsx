import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
// import useAuthStore from "../store/useAuthStore";
import useUserStore from "../store/authStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  
  const { isLogin } = useUserStore();

  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
