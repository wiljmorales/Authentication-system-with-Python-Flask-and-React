import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.private();
  }, [actions.private]);
  const navigate = useNavigate();
  return (
    <>
      {localStorage["jwt-token"] ? (
        <div>
          <h2>Super Secreto</h2>
          <p>{`Usuario: ${store.private && store.private.email}`}</p>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};
