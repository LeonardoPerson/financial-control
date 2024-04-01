import walletActionTypes from "../redux/actions/walletActions/walletActionTypes";
import userActionTypes from "../redux/actions/userActions/userActionTypes";
/*User types -------------------------------------------------------------------------*/ 
export type User = {
  email: string
}

/*Wallet types -------------------------------------------------------------------------*/ 
export type Wallet = {
  currencies: string[];
  currencieChoosed: string;
  currenciesApiSuccess: boolean;
  currenciesApiError: boolean;
  expenses: Expense[];
  editor: boolean;
  idToEdit: number;
  paymentMethods: string[];
  category: string[];
  exchangeRatesApiData: ExchangeRatesApiData; 
  exchangeRatesApiSuccess: boolean;
  totalExpense: number;
}

export type Expense = {
  id: number;
  description: string;
  tag: string;
  method: string;
  value: string;
  currency: string;
  convertedValue: number;
  exchangeRates: ExchangeRates;
}

export type ExchangeRates = {
  [key: string]: { name: string; ask: number }
}

export type ExchangeRateCommon = {
  ask: number;
  bid: string;
  code: string;
  codein: string;
  create_date: string;
  high: string;
  low: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
}

export type ExchangeRatesApiData = {
  [currencyCode: string]: ExchangeRateCommon;
};


export const INITIAL_INPUT_VALUES = {
  expenseValue: '',
  expenseDescription: '',
  currencie: '',
  paymentMethod: '',
  tag: '',
};

export type InputValues = typeof INITIAL_INPUT_VALUES;

/*Action types -------------------------------------------------------------------------*/ 
export type Action = {
  type: string;
  info: string;
  editor: boolean;
  expense: Expense;
  expenseId: number;
  idToEdit: number;
  wallet: Wallet;
  subtractFromTheTotalExpense: number;
  currenciesApiData: ExchangeRatesApiData;
  currenciesApiSuccess: boolean;
  currenciesApiError: boolean;
  errorCurrenciesApiMessage: string;
  exchangeRatesApiData: ExchangeRatesApiData;
  exchangeRatesApiSuccess: boolean;
  exchangeRatesApiError: boolean;
  exchangeRatesErrorApiMessage: string;
}

interface ActionInfo {
  type: string;
  info: string;
}

export interface AddUserAction extends ActionInfo {
  type: typeof userActionTypes.ADD_USER;
  email: string;
}

export interface AddExpenseAction extends ActionInfo {
  type: typeof walletActionTypes.ADD_EXPENSE;
  expense: Expense;
}

export interface EditExpenseAction extends ActionInfo {
  type: typeof walletActionTypes.EDIT_EXPENSE;
  idToEdit: number;
  editor: boolean;
}

export interface ConfirmEditExpenseAction extends ActionInfo {
  type: typeof walletActionTypes.CONFIRM_EDIT_EXPENSE;
  idToEdit: number;
  editor: boolean;
  wallet: Expense;
  totalExpense: number;
}

export interface ResetEditorAction extends ActionInfo {
  type: typeof walletActionTypes.RESET_EDITOR;
  editor: boolean;
}

export interface RemoveExpenseAction extends ActionInfo {
  type: typeof walletActionTypes.REMOVE_EXPENSE;
  expenseId: number;
  subtractFromTheTotalExpense: number;
}

export interface ShowTotalExpenseAction extends ActionInfo {
  type: typeof walletActionTypes.SHOW_TOTAL_EXPENSE;
  totalExpense: number;
}

export interface StartFetchCurrenciesAction extends ActionInfo {
  type: typeof walletActionTypes.FETCH_CURRENCIES;
}

export interface SuccessReturnCurrenciesAction extends ActionInfo {
  type: typeof walletActionTypes.SUCCESS_RETURN_CURRENCIES;
  currenciesApiData: ExchangeRatesApiData;
  currenciesApiSuccess: boolean;
}

export interface ErrorReturnCurrenciesAction extends ActionInfo {
  type: typeof walletActionTypes.ERROR_RETURN_CURRENCIES;
  currenciesApiErrorMessage: string;
  currenciesApiError: boolean;
}

export interface StartFetchExchangeRatesAction extends ActionInfo {
  type: typeof walletActionTypes.FETCH_EXCHANGE_RATES;
}

export interface SuccessReturnExchangeRatesAction extends ActionInfo {
  type: typeof walletActionTypes.SUCCESS_RETURN_EXCHANGE_RATES;
  exchangeRatesApiData: ExchangeRatesApiData;
  exchangeRatesApiSuccess: boolean;
}

export interface ErrorReturnExchangeRatesAction extends ActionInfo {
  type: typeof walletActionTypes.ERROR_RETURN_EXCHANGE_RATES;
  exchangeRatesErrorApiMessage: string;
  exchangeRatesApiError: boolean;
}

export type AppAction =
  | AddUserAction
  | AddExpenseAction
  | EditExpenseAction
  | ConfirmEditExpenseAction
  | ResetEditorAction
  | RemoveExpenseAction
  | ShowTotalExpenseAction
  | StartFetchCurrenciesAction
  | SuccessReturnCurrenciesAction
  | ErrorReturnCurrenciesAction
  | StartFetchExchangeRatesAction
  | SuccessReturnExchangeRatesAction
  | ErrorReturnExchangeRatesAction;

  /*
  When using 'extends ActionInfo', you are ensuring that each action interface has these common properties, 
  which facilitates code consistency and maintenance. If you need to add more common properties to all your 
  actions in the future, you can add them directly to the ActionInfo interface, and all action interfaces 
  will automatically inherit these properties without the need for additional changes to each of them. 
  */


