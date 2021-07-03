import {
  CALCULATE_VALUE_CURRENCY, CHANGE_INPUT_VALUE,
  FETCH_CURRENCIES_SUCCESS,
  SET_CURRENCY_CONVERT_TO,
  SET_CURRENT_CURRENCY, UPDATE_AVALIABLES_EXCHANGE
} from '../types/exchange';
import privatbankService from '../services/privatbankService';
import {fetchFailure, fetchRequest} from './index';

const setCurrentCurrency = (currency) => ({type: SET_CURRENT_CURRENCY, currency})
const fetchCurrenciesSuccess = (currencies) => ({type: FETCH_CURRENCIES_SUCCESS, currencies})
export const setCurrencyConvertTo = () => ({type: SET_CURRENCY_CONVERT_TO})
const updateAvaliablesExchange = () => ({type: UPDATE_AVALIABLES_EXCHANGE})
const changeInputValue = (value) => ({type: CHANGE_INPUT_VALUE, value})
const calculateValueCurrency = (value) => ({type: CALCULATE_VALUE_CURRENCY, value})

export const setCurrency = (currency) => (dispatch) => {
  dispatch(setCurrentCurrency(currency))
  dispatch(updateAvaliablesExchange())
  dispatch(setCurrencyConvertTo())
  onChangeInputValue()(dispatch)
}

export const onChangeInputValue = (value) => (dispatch) => {
  dispatch(changeInputValue(value))
  dispatch(calculateValueCurrency(value))
}

export const fetchCurrencies = (url) => async (dispatch) => {
  dispatch(fetchRequest())

  const data = await privatbankService.getCurrencies(url, () => dispatch(fetchFailure()))

  dispatch(fetchCurrenciesSuccess(data))
}
