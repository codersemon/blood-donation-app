import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authSelect } from "../features/auth/authSlice";

const PublicGuard = () => {
  // user logged in or not
  const { user } = useSelector(authSelect);

  return user ? <Navigate to={"/my-account"} /> : <Outlet />;
};

export default PublicGuard;
