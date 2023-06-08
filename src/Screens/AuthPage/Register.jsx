import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as fireauth from "firebase/auth";
import "./Login.css";
import { app, auth } from "../../firebase/Firebaseconfig";
import Message, { showMessage } from "../../components/Message/Message";
import Loading, { loadPage } from "../../components/Loading/Loading";
import * as firestore from "firebase/firestore";

const fireDB = firestore.getFirestore(app);
const initialValue = {
  email: "",
  password: "",
  confirmpassword: "",
};

const Register = () => {
  const [fields, setFields] = useState(initialValue);

  function handleChange(e) {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
  }

  function registerUser(e, { email, password, confirmpassword }) {
    e.preventDefault();
    loadPage();
    if (password === confirmpassword) {
      // Função para criar usuário própria do firebase
      fireauth
        .createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          loadPage();

          // Função para enviar e-mail de verificação própria do firebase
          fireauth.sendEmailVerification(auth.currentUser);

          // Selecionando a coleção users do firestore
          const fireDBcoll = firestore.collection(fireDB, "users");

          // Adicionando ao database nosso usuário
          firestore
            .addDoc(fireDBcoll, {
              balance: 0,
              uid: auth.currentUser.uid,
              email: email,
              transactions: [],
            })
            .then(() => {
              location.reload();
            });
        })
        .catch((err) => {
          showMessage(err, false);
          loadPage();
        });
    } else {
      loadPage();
      showMessage("Senhas não combinam", false);
    }
  }

  return (
    <div className="grid">
        <form className="grid-form" onSubmit={(e) => registerUser(e, fields)}>
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
              name="password"
              id="password"
              className="input-password"
              placeholder="Senha"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="confirm-password-input">
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
              name="confirmpassword"
              className="input-password"
              id="confirmpassword"
              placeholder="Confirmar Senha"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-btns">
            <input type="submit" value="Cadastrar" className="input-btn" />
            <Link to="/" className="link-btn">
              Já tem uma conta? Entre agora!
            </Link>
          </div>
        </form>

      <Message />
      <Loading />
    </div>
  );
};

export default Register;
