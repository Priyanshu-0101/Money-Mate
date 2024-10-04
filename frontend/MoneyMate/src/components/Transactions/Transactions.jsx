import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import TransactionItem from "../TransactionItem/TransactionItem"

function Transactions() {
  const { incomes, expenses, getIncomes, getExpenses, deleteIncome, deleteExpense ,totalTransactions} = useGlobalContext();
  const [...total] = totalTransactions();
  // console.log("total ->", total)
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  return (
    <TransactionsStyled>
      <InnerLayout>
        <h1>Transactions</h1>
        <div className="transactions-content">
          {total.map((transaction) => {
                const { _id, title, amount, date, category, description, type } = transaction;
                return (
                  <TransactionItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor={type=='income' ? "var(--color-green)":"red"}
                  />
                );
              })}
        </div>
      </InnerLayout>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  h1 {
    text-align: center;
  }

  .transactions-content {
    display: flex;
    flex-direction: column;
  }
`;

export default Transactions;
