import axios from 'axios';

const fetchAllData = () => axios.get('https://economia.awesomeapi.com.br/json/all').then((response) => response.data);

export const currenciesApi = {
  fetchAllData,
};

export const exchangeRatesApi = {
  fetchAllData,
};
