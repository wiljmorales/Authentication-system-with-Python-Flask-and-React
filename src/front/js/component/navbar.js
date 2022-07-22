import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const [logedIn, setLogedIn] = useState(false);
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/login">
            {localStorage["jwt-token"] ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </button>
            ) : (
              <button className="btn btn-primary">Login</button>
            )}
          </Link>
          <Link to="/signup">
            <button className="btn btn-info ms-3">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
