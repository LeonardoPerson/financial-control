import React from 'react';
import './WalletFormFields.css';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { InputValues } from '../types';

type WalletFormFieldsProps = {
  inputValues: InputValues;
  handleInputChange: (field: string, value: string) => void;
  currencies: string[];
  paymentMethods: string[];
  category: string[];
  fetchExchangeRatesForExpenses: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editor: boolean;
  handleCancelEditExpense: () => void;
  emptyFields: boolean;
}

function WalletFormFields(props: WalletFormFieldsProps) {
  const {
    inputValues,
    handleInputChange,
    currencies,
    paymentMethods,
    category,
    fetchExchangeRatesForExpenses,
    editor,
    handleCancelEditExpense,
    emptyFields
  } = props;
  const classWarningFields = `${emptyFields ? 'show-warning hide-warning' : 'hide-warning'}`;
  return (
    <>
      <form className="walletForm">
        <div className="field-container">
          <TextField
            id="expenseValue"
            className="form-field"
            type="number"
            label="Valor"
            value={inputValues.expenseValue}
            onChange={(event) => handleInputChange('expenseValue', event.target.value)}
            inputProps={{ 'data-testid': 'value-input' }}
          />
        </div>
        <div className="field-container">
          <TextField
            className="form-field"
            type="text"
            label="Descrição"
            value={inputValues.expenseDescription}
            onChange={(event) => handleInputChange('expenseDescription', event.target.value)}
            inputProps={{ 'data-testid': 'description-input' }}
          />
        </div>
        <div className="field-container">
          <FormControl fullWidth className="form-field">
            <InputLabel id="select-label-currencie" htmlFor="currencyInput">
              Moeda
            </InputLabel>
            <Select
              labelId="select-label-currencie"
              label="Moeda"
              value={inputValues.currencie || ''}
              defaultValue="USD"
              onChange={(event) => handleInputChange('currencie', event.target.value)}
              inputProps={{ 'id': 'currencyInput', 'data-testid': 'currency-input' }}
            >
              {
                currencies?.map((currencieCode, index) => (
                  <MenuItem
                    key={index}
                    value={currencieCode}
                    data-testid={`currency-option-${currencieCode}`}
                  >
                    {currencieCode}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="field-container">
          <FormControl fullWidth className="form-field">
            <InputLabel id="simple-select-label-payment" htmlFor="methodInput">
              Método de pagamento
            </InputLabel>
            <Select
              className="form-field"
              labelId="simple-select-label-payment"
              label="Método de pagamento"
              value={inputValues.paymentMethod || ''}
              defaultValue="Dinheiro"
              onChange={(event) => handleInputChange('paymentMethod', event.target.value)}
              inputProps={{ 'id': 'methodInput', 'data-testid': 'method-input' }}
            >
              {
                paymentMethods?.map((paymentName, index) => (
                  <MenuItem
                    key={index}
                    value={paymentName}
                  >
                    {paymentName}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="field-container">
          <FormControl fullWidth className="form-field">
            <InputLabel id="simple-select-label-category" htmlFor="tagInput">
              Categoria
            </InputLabel>
            <Select
              className="form-field"
              labelId="simple-select-label-category"
              label="Método de pagamento"
              value={inputValues.tag || ''}
              defaultValue="Alimentação"
              onChange={(event) => handleInputChange('tag', event.target.value)}
              inputProps={{ 'id':'tagInput', 'data-testid': 'tag-input' }}
            >
              {
                category?.map((tagName, index) => (
                  <MenuItem
                    key={index}
                    value={tagName}
                  >
                    {tagName}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        {
          !editor
          && (
            <span className="form-button-container">
              <Button
                className="form-field form-button"
                type="button"
                variant="contained"
                data-action-type="insert"
                onClick={(event) => fetchExchangeRatesForExpenses(event)}
              >
                Adicionar Despesa
              </Button>
            </span>
          )
        }
        {
          editor
          && (
            <span className="form-button-container">
              <Button
                className="form-field form-item-button"
                type="button"
                variant="contained"
                data-action-type="update"
                onClick={(event) => fetchExchangeRatesForExpenses(event)}
              >
                Alterar
              </Button>
              <Button
                className="form-field form-item-button"
                type="button"
                variant="contained"
                onClick={handleCancelEditExpense}
              >
                Cancelar
              </Button>
            </span>
          )
        }
      </form>
      {
        <div className={classWarningFields}> 
          <Alert variant="filled" severity="error" className="warning-alert">
            Preencha os campos vazios.
          </Alert>
        </div>
      }
    </>
  );
}

WalletFormFields.defaultProps = {
  inputValues: {},
  handleInputChange: null,
  currencies: [],
  paymentMethods: [],
  category: [],
  editor: false,
  handleEditExpense: null,
};

WalletFormFields.propTypes = {
  inputValues: PropTypes.shape({
    expenseValue: PropTypes.string,
    expenseDescription: PropTypes.string,
    currencie: PropTypes.string,
    paymentMethod: PropTypes.string,
    tag: PropTypes.string,
  }),
  handleInputChange: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  paymentMethods: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  category: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  fetchExchangeRatesForExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  handleEditExpense: PropTypes.func,
};

export default WalletFormFields;
