import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthStore";

/**
 * Wrapper guard for a react router outlet to allow for automatic redirection to login
 * page whenever current authentication context becomes undefined.
 */
export const GuardedRoute = (): JSX.Element => {
  const { userData } = useContext(AuthContext);
  return userData ? <Outlet /> : <Navigate to='/login' />;
};

export default GuardedRoute;