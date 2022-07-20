import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center">
      <form className="container">
        <h2>Login</h2>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            const success = await actions.login({
              email: email,
              password: password,
            });
            if (success) {
              navigate("/private");
              return;
            }
            alert("something happend with the login");
          }}
        >
          login
        </button>
      </form>
      <Link to={"/singup"} className="align-self-center">
        No tienes Cuenta? haz click aqui
      </Link>
    </div>
  );
};
