import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserData } from "./ReduxToolkit/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === undefined) {
      localStorage.setItem("user", JSON.stringify(null));
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (user) {
      onSnapshot(doc(db, "users", user?.uid), (doc) => {
        const loggedUser = doc.data();
        delete loggedUser.Created_At;
        dispatch(setUserData(loggedUser));
      });
    }
  }, [user, dispatch]);

  const RequireAuth = ({ children }) =>
    user ? <div>{children}</div> : <Navigate to="/login-page" />;
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
