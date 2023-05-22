import { Button, Container } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const TestPage = () => {
  const navigate = useNavigate();
  const [, setSelectedCategory] = useState("");

  const handleTestButtonClick = (category) => {
    setSelectedCategory(category);
    navigate(category);
  };

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
          onClick={() => handleTestButtonClick("/test/quiz1")}
        >
          Опитування 1
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => handleTestButtonClick("/test/quiz2")}
        >
          Опитування 2
        </Button>
      </Container>
      <Outlet />
    </>
  );
};
