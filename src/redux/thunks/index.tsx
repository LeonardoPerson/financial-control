import { currenciesApi, exchangeRatesApi } from '../apiServices';
import {
  errorReturnCurrencies,
  errorReturnExchangeRates,
  startFetchCurrencies,
  startFetchExchangeRates,
  successReturnCurrencies,
  successReturnExchangeRates,
} from '../actions/walletActions';
import { ExchangeRatesApiData, AppAction } from '../../types';
import { Dispatch } from 'redux';

const checkingDataReturn = (data: ExchangeRatesApiData) => Object.values(data).length > 0;

export const currenciesThunks = {
  fetchCurrencies: () => (dispatch: Dispatch<AppAction>) => {
    dispatch(startFetchCurrencies());
    currenciesApi
      .fetchAllData()
      .then((data) => {
        dispatch(successReturnCurrencies(data, checkingDataReturn(data)));
      })
      .catch((error) => {
        dispatch(errorReturnCurrencies(error.message, !!error.message));
      });
  },
};

export const exchangeRatesThunks = {
  fetchExchangeRates: () => (dispatch: Dispatch<AppAction>) => {
    dispatch(startFetchExchangeRates());
    exchangeRatesApi
      .fetchAllData()
      .then((data) => {
        dispatch(successReturnExchangeRates(data, checkingDataReturn(data)));
      })
      .catch((error) => {
        dispatch(errorReturnExchangeRates(error, !!error.message));
      });
  },
};
