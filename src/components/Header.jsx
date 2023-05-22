import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Quiz
        </Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={handleClick}>
            <LogoutIcon /> Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
