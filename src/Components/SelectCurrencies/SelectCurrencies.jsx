import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import './SelectCurrencies.scss'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(3),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectCurrencies = (
  {avaliablesCurrencies, fieldLabel, inputLabel,
    currency, operation, changeCurrentCurrency,
    exchangeValue, onInputChange
  }
  ) => {
  const classes = useStyles();
  const isFieldReadOnly = operation === 'take'

  React.useEffect(() => {
    if(!currency) return
    changeCurrentCurrency(currency)
  }, [currency])

  const selectChange = (event) => {
    changeCurrentCurrency(event.target.value);
  };

  const inputChange = (event) => {
    const value = event.target.value.replace(/\D/g,'')
    onInputChange(value)
  }

  return (
    <Grid container sm={6} spacing={3} item={true}>
      <TextField label={fieldLabel}
                 value={exchangeValue}
                 InputProps={{
                   readOnly: isFieldReadOnly,
                 }}
                 onChange={inputChange}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency || ''}
          onChange={selectChange}
        >
          {
            avaliablesCurrencies.map(currency => {
              const value = isFieldReadOnly ? currency.base_ccy : currency.ccy

              return <MenuItem key={currency.ccy} value={value}>{value}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectCurrencies;
