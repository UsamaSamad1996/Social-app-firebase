import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const { user } = useSelector((state) => state.user);

  console.log("user set", user?.email);
  useEffect(() => {
    if (user === undefined) {
      localStorage.setItem("user", JSON.stringify(null));
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const RequireAuth = ({ children }) =>
    user ? children : <Navigate to="/login-page" />;
  return (
    <div>
      <Routes>
        <Route exact path="/create-account" element={<CreateAccount />} />
        <Route exact path="/login-page" element={<LoginPage />} />

        <Route
          exact
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
