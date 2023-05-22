import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogInUserMutation } from "../../redux/auth/authApi";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [{ isLoading }] = useLogInUserMutation();

  return isLoggedIn && !isLoading ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};
