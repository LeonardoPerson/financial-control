import actionsType from './actionsTypes';
import { Expense, ExchangeRatesApiData } from '../../types';

// Coloque aqui suas actions
export function addUser(email: string) {
  return {
    type: actionsType.ADD_USER,
    info: 'Add expense in wallet',
    email,
  };
}

export function addExpense(expense: Expense) {
  return {
    type: actionsType.ADD_EXPENSE,
    info: 'Add expense in wallet',
    expense,
  };
}

export function editExpense(idToEdit: number, editor: boolean) {
  return {
    type: actionsType.EDIT_EXPENSE,
    info: 'Edit expense values in wallet',
    idToEdit,
    editor,
  };
}

export function resetEditor(editor: boolean) {
  return {
    type: actionsType.RESET_EDITOR,
    info: 'Reset editor',
    editor,
  };
}

export function confirmEditExpense(idToEdit: number, editor: boolean, expense: Expense, totalExpense: number) {
  return {
    type: actionsType.CONFIRM_EDIT_EXPENSE,
    info: 'Confirm new values of expense in wallet',
    idToEdit,
    editor,
    expense,
    totalExpense,
  };
}

export function removeExpense(expenseId: number, subtractFromTheTotalExpense: number) {
  return {
    type: actionsType.REMOVE_EXPENSE,
    info: 'Remove expense values in wallet',
    expenseId,
    subtractFromTheTotalExpense,
  };
}

export function showTotalExpense(totalExpense: number) {
  return {
    type: actionsType.SHOW_TOTAL_EXPENSE,
    info: 'Show total value of expenses',
    totalExpense,
  };
}

export function startFetchCurrencies() {
  return {
    type: actionsType.FETCH_CURRENCIES,
    info: 'Fetching currencies from api',
  };
}

export function successReturnCurrencies(
  currenciesApiData: ExchangeRatesApiData,
  currenciesApiSuccess: boolean,
) {
  return {
    type: actionsType.SUCCESS_RETURN_CURRENCIES,
    info: 'Currencies return success from api',
    currenciesApiData,
    currenciesApiSuccess,
  };
}

export function errorReturnCurrencies(
  currenciesApiErrorMessage: string,
  currenciesApiError: boolean,
) {
  return {
    type: actionsType.ERROR_RETURN_CURRENCIES,
    info: 'Currencies return success from api',
    currenciesApiErrorMessage,
    currenciesApiError,
  };
}

export function startFetchExchangeRates() {
  return {
    type: actionsType.FETCH_EXCHANGE_RATES,
    info: 'Fetching currencies from api',
  };
}

export function successReturnExchangeRates(
  exchangeRatesApiData: ExchangeRatesApiData,
  exchangeRatesApiSuccess: boolean,
) {
  return {
    type: actionsType.SUCCESS_RETURN_EXCHANGE_RATES,
    info: 'Exchange rates return success from api',
    exchangeRatesApiData,
    exchangeRatesApiSuccess,
  };
}

export function errorReturnExchangeRates(
  exchangeRatesErrorApiMessage: string,
  exchangeRatesApiError: boolean,
) {
  return {
    type: actionsType.ERROR_RETURN_EXCHANGE_RATES,
    info: 'Exchange rates return success from api',
    exchangeRatesErrorApiMessage,
    exchangeRatesApiError,
  };
}
