// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import actionsType from '../actions/actionsTypes';
import walletInitialState from './walletInitialState';
import {
  addExpenseData,
  editExpenseData,
  confirmEditExpenseData,
  errorReturnCurrenciesData,
  removeExpenseData,
  successReturnCurrenciesData,
  successReturnExchangeRatesData,
  errorReturnExchangeRatesData,
  resetEditorData,
} from './walletData';
import { Action } from '../../types';

export default function walletReducer(prevState = walletInitialState, action: Action) {
  switch (action.type) {
  case actionsType.ADD_EXPENSE:
    return addExpenseData(prevState, action);

  case actionsType.EDIT_EXPENSE:
    return editExpenseData(prevState, action);
  
  case actionsType.RESET_EDITOR:
    return resetEditorData(prevState, action);

  case actionsType.CONFIRM_EDIT_EXPENSE:
    return confirmEditExpenseData(prevState, action);

  case actionsType.REMOVE_EXPENSE:
    return removeExpenseData(prevState, action);

  case actionsType.SUCCESS_RETURN_CURRENCIES:
    return successReturnCurrenciesData(prevState, action);

  case actionsType.ERROR_RETURN_CURRENCIES:
    return errorReturnCurrenciesData(prevState, action);

  case actionsType.SUCCESS_RETURN_EXCHANGE_RATES:
    return successReturnExchangeRatesData(prevState, action);

  case actionsType.ERROR_RETURN_EXCHANGE_RATES:
    return errorReturnExchangeRatesData(prevState, action);

  default:
    return prevState;
  }
}
