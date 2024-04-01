const walletInitialState = {
  currencies: [],
  currencieChoosed: 'BRL',
  currenciesApiSuccess: false,
  currenciesApiError: false,
  expenses: [],
  editor: false,
  idToEdit: 0,
  paymentMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  category: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  exchangeRatesApiData: {},
  exchangeRatesApiSuccess: false,
  totalExpense: 0.00,
};

export default walletInitialState;
