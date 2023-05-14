import * as firestore from "firebase/firestore";
import React, { useState } from "react";
import { app, auth } from "../../firebase/Firebaseconfig";
import { Link } from "react-router-dom";
import Message, { showMessage } from "../../components/Message/Message";
import Loading, { loadPage } from "../../components/Loading/Loading";
import "./TransactionForm.css";

const fireDB = firestore.getFirestore(app); // Selecionando o database firestore configuado
const fireDBcoll = firestore.collection(fireDB, "users"); // Selecionando a coleção Users no database

// Retornando as propriedades do usuário logado
export const userDocs = await firestore.getDocs(fireDBcoll).then((data) => {
  const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const findUser = newData.find(
    (doc) => doc?.email === auth?.currentUser?.email
  );
  return findUser;
});

// Função para enviar transações
function sendTransaction(e, { email, value }) {
  e.preventDefault();

  // Função que seleciona meus documentos existentes na coleção users
  firestore.getDocs(fireDBcoll).then((data) => {
    loadPage();

    // Definindo usuário que irá receber e enviar a transação
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userRecieving = newData.find((doc) => doc.email === email); // Usuário a receber
    const userSending = newData.find(
      (doc) => doc.email === auth.currentUser.email
    ); // Usuário a enviar

    // Tratamento de erros
    if (!userRecieving) {
      loadPage();
      showMessage("Email não existe!", false);
      return;
    } else if (userRecieving === userSending) {
      loadPage();
      showMessage("Você está tentando transacionar para você mesmo!", false);
      return;
    }

    // Pegando os dados dos usuários que irá receber e enviar a transação
    const docSendingRef = firestore.doc(fireDBcoll, userSending.id);
    const docRecievingRef = firestore.doc(fireDBcoll, userRecieving.id);

    // Formatando data
    const date = new Date();
    const dateDay = ("0" + date.getDate()).slice(-2);
    const dateMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    const dateYear = date.getFullYear();
    const dateFormated = `${dateDay}-${dateMonth}-${dateYear}`;

    // Transação sendo realizada
    const thisTransaction = {
      toEmail: email,
      fromEmail: auth.currentUser.email,
      value: value,
      date: dateFormated,
    };

    // Usuário que irá enviar a transação
    const userSendingBalance =
      userDocs.transactions.reduce(
        (accum, item) =>
          item.fromEmail === userDocs.email
            ? accum - Number(item?.value)
            : accum + Number(item.value),
        0
      ) - Number(value);

    const updatedUserSending = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      balance: userSendingBalance,
      transactions: [thisTransaction, ...userDocs.transactions],
    };

    // Usuário que irá receber a transação
    const userRecievingBalance =
      userRecieving.transactions.reduce(
        (accum, item) =>
          item.fromEmail === userRecieving.email
            ? accum - Number(item?.value)
            : accum + Number(item.value),
        0
      ) + Number(value);

    const updatedUserRecieving = {
      uid: userRecieving.uid,
      email: userRecieving.email,
      balance: userRecievingBalance,
      transactions: [thisTransaction, ...userRecieving.transactions],
    };

    // Atualizando o DB com as informaçõe passadas
    firestore.updateDoc(docSendingRef, updatedUserSending);
    firestore.updateDoc(docRecievingRef, updatedUserRecieving);
    userDocs.transactions.unshift(thisTransaction);
    userDocs.balance = userSendingBalance;

    loadPage();
    showMessage("Pix enviado com sucesso", true);
  });
}

const initialValue = {
  value: "",
  email: "",
};

const TransactionForm = () => {
  const [fields, setFields] = useState(initialValue);

  function handleChange(e) {
    setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <div className="grid-transaction">
      <form
        onSubmit={(e) => {
          sendTransaction(e, fields);
          setFields(initialValue);
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1875/1875530.png"
          className="transaction-form-img"
        />
        <div>
          <label htmlFor="trans-mail" className="input-label">
            E-mail de envio
          </label>
          <input
            type="email"
            name="email"
            id="trans-mail"
            value={fields.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="trans-value" className="input-label">
            Valor
          </label>
          <input
            type="number"
            name="value"
            id="trans-value"
            value={fields.value}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type="submit" value="Enviar" className="submit-transaction" />
        <Link to="/home" className="link-btn">
          Voltar
        </Link>
      </form>
      <Loading />
      <Message />
    </div>
  );
};

export default TransactionForm;
