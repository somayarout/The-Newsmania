import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../Stores/useAuthStore.js";


const ProtectedRoute = () => {

  const {authUser}  = useAuthStore();
  return authUser ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedRoute;