import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currenciesThunks, exchangeRatesThunks } from '../redux/thunks';
import { loadingInformation } from '../utils';
import { addExpense, confirmEditExpense, resetEditor } from '../redux/actions/walletActions';
import WalletFormFields from './WalletFormFields';
import { Wallet, InputValues, INITIAL_INPUT_VALUES } from '../types';

const INITIAL_EXPENSE_ID = -1;
type ActionType = "insert" | "update" | "";

function WalletForm() {
  const {
    currencies,
    currenciesApiSuccess,
    exchangeRatesApiSuccess,
    exchangeRatesApiData,
    paymentMethods,
    category,
    editor,
    idToEdit } = useSelector((state: { wallet: Wallet }) => state.wallet);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [nextExpenseId, setNextExpenseId] = useState(INITIAL_EXPENSE_ID);
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  const [emptyFields, setEmptyFields] = useState(false);
  const [actionType, setActionType] = useState<ActionType>("");
  const handleInputChange = useCallback((field: string, value: string) => {
    setInputValues({
      ...inputValues,
      [field]: value,
    });
    setEmptyFields(false);
  }, [inputValues]);

  const idExpenseControl = useCallback(() => {
    const idIncrement = 1;
    setNextExpenseId((prevExpenseId) => prevExpenseId + idIncrement);
  }, []);

  const fieldValidation = useCallback(() => {
    const fields: (keyof InputValues)[] = Object.keys(INITIAL_INPUT_VALUES) as (keyof InputValues)[];
    const emptyFieldsFound = fields.some((field) => inputValues[field] === '');
    if (emptyFieldsFound) {
      return !emptyFieldsFound;
    }
    return !emptyFieldsFound;
  }, [inputValues]);

  const fetchExchangeRatesForExpenses = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (fieldValidation()) {
      const actionType = event.currentTarget.dataset.actionType as ActionType;
      setActionType(actionType);
      const asyncAction = exchangeRatesThunks.fetchExchangeRates();
      dispatch(asyncAction);
      actionType === "insert" && idExpenseControl();
      setEmptyFields(false);
    } else {
      setEmptyFields(true);
    }
  }, [dispatch, fieldValidation, idExpenseControl, setEmptyFields]);

  const convertedExpenseValue = useCallback(() => {
    let total = 0;
    if (inputValues.currencie) {
      total = exchangeRatesApiData[inputValues.currencie].ask * parseFloat(inputValues.expenseValue);
    }
    return total;
  }, [exchangeRatesApiData, inputValues]);

  const clearInputs = useCallback(() => {
    setInputValues(INITIAL_INPUT_VALUES);
  }, []);

  const getIdType = useCallback(() => {
    return actionType === "insert" ? nextExpenseId : idToEdit;
  }, [actionType, nextExpenseId, idToEdit]);

  const getExpenseDataFromInputs = useCallback(() => {
    const expenseData = {
      id: getIdType(),
      value: inputValues.expenseValue.toString(),
      description: inputValues.expenseDescription,
      currency: inputValues.currencie,
      convertedValue: convertedExpenseValue(),
      method: inputValues.paymentMethod,
      tag: inputValues.tag,
      exchangeRates: exchangeRatesApiData,
    };
  
    return expenseData;
  }, [
    getIdType,
    convertedExpenseValue,
    inputValues,
    exchangeRatesApiData,
  ]);

  const addExpenseData = useCallback(() => {
    const expenseData = getExpenseDataFromInputs();
    dispatch(addExpense(expenseData));
    clearInputs();
  }, [
    getExpenseDataFromInputs,
    clearInputs,
    dispatch,
  ]);

  const handleEditExpense = useCallback(() => {
    if (fieldValidation()) {
      const resetEditor = false;
      const expenseData = getExpenseDataFromInputs();
      const totalExpense = convertedExpenseValue();
      dispatch(confirmEditExpense(idToEdit, resetEditor, expenseData, totalExpense));
      clearInputs();
    }
  }, [fieldValidation, getExpenseDataFromInputs, convertedExpenseValue, dispatch, idToEdit, clearInputs]);

  const handleCancelEditExpense = () => {
    setEmptyFields(false);
    dispatch(resetEditor(false));
  }

  const fetchCurrenciesData = useCallback(() => {
    dispatch(currenciesThunks.fetchCurrencies());
  }, [dispatch]);

  const getCurrenciesAndShowForm = useCallback(() => {
    if (currenciesApiSuccess) {
      setShowForm(currenciesApiSuccess);
    }
  }, [currenciesApiSuccess]);

  useEffect(() => {
    if (exchangeRatesApiSuccess) {
      switch (actionType) {
        case "insert":
          addExpenseData();
          setActionType("");
          break;
        case "update":
          handleEditExpense();
          setActionType("");
          break
        default:
      }
    }
    fetchCurrenciesData();
    getCurrenciesAndShowForm();
  }, [
    exchangeRatesApiSuccess,
    actionType,
    addExpenseData,
    handleEditExpense,
    fetchCurrenciesData,
    getCurrenciesAndShowForm,
  ]);

  return (
    !showForm
      ? loadingInformation() : (
        <>
          <WalletFormFields
            inputValues={inputValues}
            currencies={currencies}
            paymentMethods={paymentMethods}
            handleInputChange={handleInputChange}
            category={category}
            fetchExchangeRatesForExpenses={fetchExchangeRatesForExpenses}
            editor={editor}
            emptyFields={emptyFields}
            handleEditExpense={handleEditExpense}
            handleCancelEditExpense={handleCancelEditExpense}
          />
        </>
      )
  );
}

export default WalletForm;
