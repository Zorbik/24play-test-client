import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return children;

  if (isLoggedIn && user?.role === "admin") return <Navigate to="/statistic" />;

  if (isLoggedIn) return <Navigate to="/test" />;
};

PublicRoute.propTypes = {
  children: PropTypes.any,
};
