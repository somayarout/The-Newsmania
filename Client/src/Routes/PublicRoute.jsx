import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../Stores/useAuthStore.js"; 

const PublicRoute = () => {
  const {authUser}  = useAuthStore();
  return !authUser ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;