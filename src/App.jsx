import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { SignUpPage } from "./pages/SignUp.page";
import { TestPage } from "./pages/Test.page";
import { LogInPage } from "./pages/LogIn.page";
import { Test } from "./components/Test";
import { ResultsPage } from "./pages/Results.page";
import { Result } from "./components/Result";

function App() {
  return (
    <>
      <Suspense fallback={false}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LogInPage />} />
            <Route path="test" element={<TestPage />}>
              <Route path=":category" element={<Test />} />
            </Route>
            <Route path="statistic" element={<ResultsPage />}>
              <Route path=":category" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
