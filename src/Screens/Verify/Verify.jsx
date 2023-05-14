import React from "react";
import { auth } from "../../firebase/Firebaseconfig";
import * as fireauth from "firebase/auth";
import "./Verify.css";

const Verify = () => {
  function handleSendEmail() {
    fireauth.sendEmailVerification(auth.currentUser);
    alert("Email enviado com sucesso!");
  }
  return (
    <div className="verify-div">
      <div className="verify-content">
        <h1 className="verify-title">Verifique seu e-mail!</h1>
        <p className="verify-paragraph" onClick={() => handleSendEmail()}>
          Não recebeu o e-mail? Clique aqui
        </p>
        <button className="input-btn" onClick={() => fireauth.signOut(auth)}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Verify;
