import React from "react";
import { auth } from "../../firebase/Firebaseconfig";
import { Link } from "react-router-dom";
import * as fireauth from "firebase/auth";
import Loading from "../../components/Loading/Loading";
import "./Home.css";
import Transactions from "../../components/Transactions/Transactions";
import { userDocs } from "../TransactionForm/TransactionForm";

// Função para deslogar do aplicativo
function signOut() {
  fireauth.signOut(auth);
  location.reload();
  loadPage();
}

const Home = () => {
  // Função para calcular o saldo do usuário
  return (
    <div className="home-grid">
      <div className="home-grid-sections">
        <div className="home-left-side">
          <div>
            <h1 className="home-title">Seja bem vindo!</h1>
            <small>Email: {auth.currentUser.email}</small>
            <small className="user-balance">
              Saldo: R$ {Number(userDocs?.balance).toFixed(2)}
            </small>
          </div>
          <button className="signOut-btn" onClick={() => signOut()}>
            Sair
          </button>
        </div>
        <div className="home-right-side">
          <p>
            Transações recentes (
            {
              <Link to="/transaction" className="create-transaction">
                Transacionar
              </Link>
            }
            )
          </p>
          <div className="transactions-grid">
            <Transactions />
          </div>
        </div>
      </div>

      <Loading />
    </div>
  );
};

export default Home;
