import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Container from "@mui/material/Container";
import Header from "./Header";

export const Layout = () => {
  return (
    <>
      <Container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Header />

        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
