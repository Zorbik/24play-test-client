import { Button, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export const ResultsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("quiz1")}
        >
          Опитування 1
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => navigate("quiz2")}
        >
          Опитування 2
        </Button>
      </Container>
      <Outlet />
    </>
  );
};
