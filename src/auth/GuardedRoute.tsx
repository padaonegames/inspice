import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthStore';

/**
 * Wrapper guard for a react router outlet to allow for automatic redirection to login
 * page whenever current authentication context becomes undefined.
 */
export const GuardedRoute = (): JSX.Element => {
  const { userData, accessToken } = useContext(AuthContext);
  const location = useLocation(); // to know where to redirect the user to after successful logins
  return userData && accessToken ? <Outlet /> : <Navigate to='/login' state={location.pathname} />;
};

export default GuardedRoute;