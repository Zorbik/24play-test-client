import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { SignUpPage } from "./pages/SignUp.page";
import { TestPage } from "./pages/Test.page";
import { LogInPage } from "./pages/LogIn.page";
import { Test } from "./components/Test";
import { ResultsPage } from "./pages/Results.page";
import { Result } from "./components/Result";
import { PublicRoute } from "./components/Routs/PublicRoute";
import { PrivateRoute } from "./components/Routs/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "./redux/auth/authApi";
import { refresh } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);
  const { data, isLoading } = useGetUserQuery(token, {
    skip: token === null,
  });

  useEffect(() => {
    if (!data) return;

    dispatch(refresh(data));
  }, [data, dispatch]);
  return (
    !isLoading && (
      <Suspense fallback={false}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PublicRoute>
                  <LogInPage />
                </PublicRoute>
              }
            />
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              }
            />

            <Route
              path="test"
              element={
                <PrivateRoute>
                  <TestPage />
                </PrivateRoute>
              }
            >
              <Route path=":category" element={<Test />} />
            </Route>
            <Route
              path="statistic"
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            >
              <Route path=":category" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    )
  );
}

export default App;
