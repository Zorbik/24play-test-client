import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogIn } from "../components/Auth/schema";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useLogInUserMutation } from "../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { useToast } from "../hooks/useToast";
import { logIn } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const LogInPage = () => {
  const [logInUser, { isLoading }] = useLogInUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast, Toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schemaLogIn) });

  const onSubmit = async (data) => {
    try {
      const { data: res, error } = await logInUser(data);
      if (error) return showToast(error.data.message, "error");

      showToast("LogedIn successfully", "success");

      dispatch(logIn(res));
      reset();
      navigate("/test");
    } catch (error) {
      showToast(error?.data.message, "error");
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
        <Toast />
        {isLoading && <CircularProgress />}
      </Container>
    </>
  );
};
