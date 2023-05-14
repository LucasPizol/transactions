import React from "react";
import "./Message.css";

export function showMessage(message, isSucessfull) {
  // Função para mostrar uma mensagem. Caso o parâmetro "IsSucessful" seja falso, retornará um erro. Caso não, retornará uma mensagem de sucesso
  const messageElement = document.querySelector(".element-message");
  messageElement.innerText = message;
  messageElement.style.opacity = 1;
  messageElement.classList.remove("error");
  if (!isSucessfull) {
    messageElement.classList.add("error");
    switch (messageElement.innerText) {
      case "FirebaseError: Firebase: Error (auth/user-not-found).":
        messageElement.innerText = "Usuário não encontrado";
        break;
      case "FirebaseError: Firebase: Error (auth/invalid-email).":
        messageElement.innerText = "E-mail inválido";
        break;
      case "FirebaseError: Firebase: Error (auth/wrong-password).":
        messageElement.innerText = "Senha incorreta!";
        break;
      case "FirebaseError: Firebase: Error (auth/email-already-in-use).":
        messageElement.innerText = "E-mail já está sendo utilizado!";
        break;
      case "FirebaseError: Firebase: Error (auth/missing-password).":
        messageElement.innerText = "Digite uma senha!";
        break;
    }
  }
}

const Message = () => {
  return <p className="element-message">Erro</p>;
};

export default Message;
