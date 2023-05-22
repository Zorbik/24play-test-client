import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Container } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { useToast } from "../hooks/useToast";
import { signUp } from "../redux/auth/authSlice";
import { schemaSignUp } from "../components/Auth/schema";
import { useRegisterUserMutation } from "../redux/auth/authApi";

export const SignUpPage = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast, Toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schemaSignUp) });

  const onSubmit = async (data) => {
    delete data.cpassword;

    try {
      const { data: res, error } = await registerUser(data);
      if (error) return showToast(error.data.message, "error");

      showToast("Registration completed successfully", "success");

      dispatch(signUp(res));
      reset();
      navigate("test");
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
            <Grid item xs={12}>
              <TextField
                label="Confirm password"
                type="password"
                {...register("cpassword")}
                error={errors.cpassword ? true : false}
                helperText={errors.cpassword?.message}
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
                Sign Up
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
