import { Expense, ExchangeRatesApiData } from '../../../types';
import walletActionTypes from './walletActionTypes';

export function addExpense(expense: Expense) {
    return {
      type: walletActionTypes.ADD_EXPENSE,
      info: 'Add expense in wallet',
      expense,
    };
  }
  
  export function editExpense(idToEdit: number, editor: boolean) {
    return {
      type: walletActionTypes.EDIT_EXPENSE,
      info: 'Edit expense values in wallet',
      idToEdit,
      editor,
    };
  }
  
  export function resetEditor(editor: boolean) {
    return {
      type: walletActionTypes.RESET_EDITOR,
      info: 'Reset editor',
      editor,
    };
  }
  
  export function confirmEditExpense(idToEdit: number, editor: boolean, expense: Expense, totalExpense: number) {
    return {
      type: walletActionTypes.CONFIRM_EDIT_EXPENSE,
      info: 'Confirm new values of expense in wallet',
      idToEdit,
      editor,
      expense,
      totalExpense,
    };
  }
  
  export function removeExpense(expenseId: number, subtractFromTheTotalExpense: number) {
    return {
      type: walletActionTypes.REMOVE_EXPENSE,
      info: 'Remove expense values in wallet',
      expenseId,
      subtractFromTheTotalExpense,
    };
  }
  
  export function showTotalExpense(totalExpense: number) {
    return {
      type: walletActionTypes.SHOW_TOTAL_EXPENSE,
      info: 'Show total value of expenses',
      totalExpense,
    };
  }
  
  export function startFetchCurrencies() {
    return {
      type: walletActionTypes.FETCH_CURRENCIES,
      info: 'Fetching currencies from api',
    };
  }
  
  export function successReturnCurrencies(
    currenciesApiData: ExchangeRatesApiData,
    currenciesApiSuccess: boolean,
  ) {
    return {
      type: walletActionTypes.SUCCESS_RETURN_CURRENCIES,
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
      type: walletActionTypes.ERROR_RETURN_CURRENCIES,
      info: 'Currencies return success from api',
      currenciesApiErrorMessage,
      currenciesApiError,
    };
  }
  
  export function startFetchExchangeRates() {
    return {
      type: walletActionTypes.FETCH_EXCHANGE_RATES,
      info: 'Fetching currencies from api',
    };
  }
  
  export function successReturnExchangeRates(
    exchangeRatesApiData: ExchangeRatesApiData,
    exchangeRatesApiSuccess: boolean,
  ) {
    return {
      type: walletActionTypes.SUCCESS_RETURN_EXCHANGE_RATES,
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
      type: walletActionTypes.ERROR_RETURN_EXCHANGE_RATES,
      info: 'Exchange rates return success from api',
      exchangeRatesErrorApiMessage,
      exchangeRatesApiError,
    };
  }