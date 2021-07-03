import {
  CALCULATE_VALUE_CURRENCY, CHANGE_INPUT_VALUE,
  FETCH_CURRENCIES_SUCCESS,
  SET_CURRENCY_CONVERT_TO,
  SET_CURRENT_CURRENCY, UPDATE_AVALIABLES_EXCHANGE
} from '../types/exchange';
import {FETCH_FAILURE, FETCH_REQUEST} from '../types';

const initialState = {
  currentCurrency: null,
  availablesExchange: [],
  currencies: [],
  isLoading: false,
  isError: false,
  currencyConvertTo: null,
  exchangeValue: 0,
  inputValue: ''
}

function getCurrentCurrency(currencies, currentCurrency) {
  return  currencies.find(currency => currency.ccy === currentCurrency)
}

const exchange = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CURRENCIES_SUCCESS:
      const filteredCurrencies = action.currencies.filter((currency, i) => !i)

      return {
        ...state,
        currentCurrency: action.currencies[0].ccy,
        currencyConvertTo: action.currencies[0].base_ccy,
        availablesExchange: filteredCurrencies,
        isLoading: false,
        isError: false,
        currencies: action.currencies
      }
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case CHANGE_INPUT_VALUE: {
      if(!action.value) {
        return {...state, inputValue: '', exchangeValue: ''}
      }

      return {
        ...state,
        inputValue: action.value
      }
    }
    case SET_CURRENCY_CONVERT_TO: {
      const currencyCurrency = getCurrentCurrency(state.currencies, state.currentCurrency)

      return {
        ...state,
        currencyConvertTo: currencyCurrency.base_ccy
      }
    }
    case SET_CURRENT_CURRENCY: {
      const currentCurrency = getCurrentCurrency(state.currencies, action.currency)

      return {
        ...state,
        currentCurrency: currentCurrency.ccy
      }
    }
    case CALCULATE_VALUE_CURRENCY: {
      const currentCurrency = getCurrentCurrency(state.currencies, state.currentCurrency)
      const currentValueExchange = currentCurrency.sale

      return {
        ...state,
        exchangeValue: (+currentValueExchange * +state.inputValue).toFixed(2)
      }
    }
    case UPDATE_AVALIABLES_EXCHANGE:
      const avaliablesCurrencies = state.currencies.filter(currency => currency.ccy === state.currentCurrency)

      return {
        ...state,
        availablesExchange: avaliablesCurrencies
      }
    default:
      return state
  }
}

export default exchange
