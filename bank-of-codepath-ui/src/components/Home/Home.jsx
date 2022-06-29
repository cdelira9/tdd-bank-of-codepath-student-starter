import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home(props) {

  useEffect(() => {
    props.setIsLoading(true);
    const getTransactions = async () => {
      try {
        const transactionsData = await axios.get(
          "http://localhost:3000/bank/transactions"
        );
        props.setTransactions(transactionsData);
      } catch (error) {
        props.setError(error);
      }
    };

    const getTransfers = async () => {
      try {
        const transfersData = await axios.get(
          "http://localhost:3000/bank/transfers"
        );
        props.setTransfers(transfersData);
      } catch (error) {
        props.setError(error);
      }
    };
    getTransactions();
    getTransfers();
    props.setIsLoading(false);
  }, []);

//   const filteredTransactions = props.transactions.filter(description =>
// {
//   return (props.filterInputValue.toLowerCase());
// }   )


  return (
    <div className="home">
      <AddTransaction />
      {props.isLoading ? <h1>Loading...</h1> : <BankActivity />}
      {props.error ? <h2 className="error"></h2> : null}
    </div>
  );
}
