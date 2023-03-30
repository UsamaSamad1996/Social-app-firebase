import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/create-account" element={<CreateAccount />} />
        <Route exact path="/login-page" element={<LoginPage />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
