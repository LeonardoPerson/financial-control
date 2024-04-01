import { deletePropertyFromObject, generateCurrencies } from '../../../utils';
import { Wallet, Action } from '../../../types';

const totalConvertedValue = (prevState: Wallet, action: Action) => {
  const actualConvertedValue = action.expense.convertedValue;
  const prevExpenses = prevState.expenses.filter((expense, index) => (
    index !== action.expense.id
  ));
  const total = prevExpenses.reduce((acc, expense) => (
    acc + expense.convertedValue
  ), 0);
  return total + actualConvertedValue;
};

export function addExpenseData(prevState: Wallet, action: Action) {
  return {
    ...prevState,
    expenses: [...prevState.expenses, action.expense],
    exchangeRatesApiSuccess: false,
    totalExpense: totalConvertedValue(prevState, action),
  };
}

export function editExpenseData(prevState: Wallet, action: Action) {
  return {
    ...prevState,
    editor: action.editor,
    idToEdit: action.idToEdit,
  };
}

export function resetEditorData(prevState: Wallet, action: Action) {
  return {
    ...prevState,
    editor: action.editor,
  };
}

export function confirmEditExpenseData(prevState: Wallet, action: Action) {
  const EXPENSE_NOT_FOUND = -1;  
  const expensePosition = prevState.expenses.findIndex((expense) => (
    expense.id === action.idToEdit
  ));
  if (expensePosition === EXPENSE_NOT_FOUND) {
    return prevState;
  }
  // Todas as expenses do estado anterior
  const allPrevExpenses = [...prevState.expenses];
  // Expense específica para alterar e recuperar os exchangeRates
  const expenseToUpdate = allPrevExpenses[expensePosition];
  const updatedExpense = {
    ...action.expense, // Novos valores
    exchangeRates: expenseToUpdate.exchangeRates, // Mantendo taxas anteriores
  };
  allPrevExpenses.splice(expensePosition, 1, updatedExpense);
  return {
    ...prevState,
    editor: action.editor,
    expenses: allPrevExpenses,
    totalExpense: totalConvertedValue(prevState, action),
  };
}

export function removeExpenseData(prevState: Wallet, action: Action) {
  const subtractFromTheTotalExpense = (
    prevState.totalExpense - action.subtractFromTheTotalExpense
  );
  return {
    ...prevState,
    expenses: prevState.expenses.filter((expense) => expense.id !== action.expenseId),
    totalExpense: subtractFromTheTotalExpense,
  };
}

export function successReturnCurrenciesData(prevState: Wallet, action: Action) {
  deletePropertyFromObject(action.currenciesApiData, 'USDT');
  const currenciesData = generateCurrencies(action.currenciesApiData);
  return {
    ...prevState,
    currenciesApiSuccess: action.currenciesApiSuccess,
    currencies: currenciesData,
  };
}

export function errorReturnCurrenciesData(prevState: Wallet, action: Action) {
  return {
    ...prevState,
    currenciesApiError: action.currenciesApiError,
    currenciesApiErrorMessage: action.errorCurrenciesApiMessage,
  };
}

export function successReturnExchangeRatesData(prevState: Wallet, action: Action) {
  deletePropertyFromObject(action.exchangeRatesApiData, 'USDT');
  return {
    ...prevState,
    exchangeRatesApiData: action.exchangeRatesApiData,
    exchangeRatesApiSuccess: action.exchangeRatesApiSuccess,
  };
}

export function errorReturnExchangeRatesData(prevState: Wallet, action: Action) {
  return {
    ...prevState,
    exchangeRatesApiError: action.exchangeRatesApiError,
    exchangeRatesErrorApiMessage: action.exchangeRatesErrorApiMessage,
  };
}
