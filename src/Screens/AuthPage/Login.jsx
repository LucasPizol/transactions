import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as fireauth from "firebase/auth";
import "./Login.css";
import { auth } from "../../firebase/Firebaseconfig";
import Message, { showMessage } from "../../components/Message/Message";
import Loading, { loadPage } from "../../components/Loading/Loading";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const [fields, setFields] = useState(initialValue);

  function handleChange(e) {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
  }

  function authUser(e, { email, password }) {
    e.preventDefault();
    loadPage();
    fireauth
      .signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        loadPage();
        location.reload();
      })
      .catch((err) => {
        showMessage(err);
        loadPage();
      });
  }

  return (
    <div className="grid">
      <div className="body-group">
        <img
          className="grid-main-img"
          src="https://clipartix.com/wp-content/uploads/2017/03/Welcome-back-clipart-dfiles.jpg"
        />
        <form className="grid-form" onSubmit={(e) => authUser(e, fields)}>
          <img
            className="form-img"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
          <div className="mail-input">
            <img
              className="input-icon"
              src="https://cdn-icons-png.flaticon.com/512/2549/2549872.png"
            />
            <input
              type="text"
              name="email"
              id="mail"
              placeholder="E-mail"
              value={fields.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="password-input">
            <img
              className="input-icon"
              src="https://cdn.onlinewebfonts.com/svg/img_238711.png"
              onClick={(e) => {
                const password =
                  e.currentTarget.parentNode.querySelector(".input-password");

                password.type == "password"
                  ? (password.type = "text")
                  : (password.type = "password");
              }}
            />
            <input
              type="password"
              className="input-password"
              name="password"
              id="password"
              placeholder="Senha"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-btns">
            <input type="submit" value="Logar" className="input-btn" />
            <Link to="/register" className="link-btn">
              Não tem cadastro? Clique aqui para se registrar
            </Link>
          </div>
        </form>
      </div>
      <Message />
      <Loading />
    </div>
  );
};

export default Login;
