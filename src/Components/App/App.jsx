import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import * as actions from '../../action/exchange'
import Spinner from '../Spinner'
import ErrorIndicator from '../errorIndicator/'
import SelectCurrencies from '../SelectCurrencies'
import {bindActionCreators} from 'redux'

const App = () => {
  const exchange = useSelector(state => state.exchange)
  const dispatch = useDispatch()
  const {
    setCurrency, setCurrencyConvertTo, fetchCurrencies,
    onChangeInputValue
  } =  bindActionCreators({
    ...actions
  }, dispatch)

  React.useEffect(() => {
    fetchCurrencies('pubinfo?json&exchange&coursid=5')
  }, [])

  if(exchange.isLoading) return <Spinner/>

  if(exchange.isError) return <ErrorIndicator/>

  return (
    <Container>
      <h1 className="text-center">Конвертирования валют</h1>
      <Grid container  sm={12} item={true}>
        <SelectCurrencies
          avaliablesCurrencies={exchange.currencies}
          fieldLabel="Меняю"
          inputLabel="Текущая валюта"
          currency={exchange.currentCurrency}
          operation="change"
          changeCurrentCurrency={setCurrency}
          onInputChange={onChangeInputValue}
          exchangeValue={exchange.inputValue}
        />
        <SelectCurrencies
          avaliablesCurrencies={exchange.availablesExchange}
          fieldLabel="Получаю"
          inputLabel="Конвертировать"
          currency={exchange.currencyConvertTo}
          exchangeValue={exchange.exchangeValue}
          operation="take"
          changeCurrentCurrency={setCurrencyConvertTo}
        />
      </Grid>
    </Container>
  )
}

export default App
