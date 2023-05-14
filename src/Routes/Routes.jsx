import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Screens/AuthPage/Login";
import * as fireauth from "firebase/auth";
import { auth } from "../firebase/Firebaseconfig";
import Home from "../Screens/Home/Home";
import Register from "../Screens/AuthPage/Register";
import Verify from "../Screens/Verify/Verify";
import TransactionForm from "../Screens/TransactionForm/TransactionForm";

function getUser() {
  return new Promise((resolve) => {
    fireauth.onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
}

const RoutesApp = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((user) => setUser(user));
  });

  const isVerified = user?.emailVerified;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/home" /> : <Register />}
      />
      <Route
        path="/home"
        element={
          !user ? (
            <Navigate to="/" />
          ) : isVerified ? (
            <Home />
          ) : (
            <Navigate to="/verify" />
          )
        }
      />
      <Route
        path="/verify"
        element={isVerified ? <Navigate to="/home" /> : <Verify />}
      />
      <Route
        path="/transaction"
        element={isVerified ? <TransactionForm /> : <Navigate to="/home" />}
      />
    </Routes>
  );
};

export default RoutesApp;
