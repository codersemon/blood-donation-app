// dependencies
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authSelect } from "../features/auth/authSlice";

const PrivateGuard = () => {
  // user logged in or not
  const { user } = useSelector(authSelect);
  
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateGuard;
