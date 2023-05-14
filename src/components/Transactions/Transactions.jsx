import React from "react";
import { auth } from "../../firebase/Firebaseconfig";
import { userDocs } from "../../Screens/TransactionForm/TransactionForm";
import "./Transactions.css";

const Transactions = () => {
  const transactionsArray = userDocs.transactions;

  return (
    <>
      {transactionsArray.map((data, index) => {
        if (data.fromEmail === auth.currentUser.email) {
          return (
            <div key={index} className="transaction sent">
              <p className="transaction-value">
                R$ {Number(data.value).toFixed(2)}
              </p>
              <div>
                <p className="transaction-userEnvolved">
                  Pix para: {data.toEmail}
                </p>
                <p className="transaction-date">{data.date}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="transaction recieved">
              <p className="transaction-value">
                R$ {Number(data.value).toFixed(2)}
              </p>
              <div>
                <p className="transaction-userEnvolved">
                  Pix de: {data.fromEmail}
                </p>
                <p className="transaction-date">{data.date}</p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Transactions;
