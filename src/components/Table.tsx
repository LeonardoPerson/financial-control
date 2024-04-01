import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { editExpense, removeExpense } from '../redux/actions';
import { Wallet, Expense } from '../types';
import './Table.css';

function Table() {
  const dispatch = useDispatch();
  const { expenses, editor } = useSelector((state: { wallet: Wallet }) => state.wallet);
  const [currentIdToEdit, setCurrentIdToEdit] = useState(0);
  const conversionCurrency = 'Real';
  const convertedValue = (ask: number, value: string) => {
    const result = (ask * parseFloat(value));
    return result;
  };
  const handleEditing = (idToEdit: number) => {
    setCurrentIdToEdit(idToEdit);
    dispatch(editExpense(idToEdit, true));
  };
  const handleDeletion = (expenseId: number, subtractFromTheTotalExpense: number) => {
    dispatch(removeExpense(expenseId, subtractFromTheTotalExpense));
  };
  return (
    <table className="wallet-table">
      <thead className="wallet-thead">
        <tr className="wallet-tr">
          <th className="wallet-th">Descrição</th>
          <th className="wallet-th">Tag</th>
          <th className="wallet-th">Método de pagamento</th>
          <th className="wallet-th">Valor</th>
          <th className="wallet-th">Moeda</th>
          <th className="wallet-th">Câmbio utilizado</th>
          <th className="wallet-th">Valor convertido</th>
          <th className="wallet-th">Moeda de conversão</th>
          <th className="wallet-th">Ações</th>
        </tr>
      </thead>
      <tbody className="wallet-tbody">
        {expenses.map((expense: Expense) => {
          const { id, description, tag, method, value, currency, exchangeRates } = expense;
          const { name, ask } = exchangeRates[currency];

          return (
            <tr key={id} className="wallet-tr">
              <td data-label="Descrição" className="wallet-td">{description}</td>
              <td data-label="Tag">{tag}</td>
              <td data-label="Método de pagamento">{method}</td>
              <td data-label="Valor">{value}</td>
              <td data-label="Moeda">{name}</td>
              <td data-label="Câmbio utilizado">{ask}</td>
              <td data-label="Valor convertido">{convertedValue(ask, value).toFixed(2)}</td>
              <td data-label="Moeda de conversão">{conversionCurrency}</td>
              <td className="button-td">
                <div className="button-container">
                  <Button
                    data-testid="edit-btn"
                    variant="contained"
                    disabled={editor && currentIdToEdit === id}
                    onClick={() => handleEditing(id)}
                  >
                    Editar
                  </Button>
                  <Button
                    data-testid="delete-btn"
                    variant="contained"
                    color="error"
                    disabled={editor && currentIdToEdit === id}
                    onClick={() => handleDeletion(id, convertedValue(ask, value))}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
}
export default Table;
