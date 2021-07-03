import ConfigureServices from './configureServices';

class PrivatbankService {
 async getCurrencies(url, errorAction) {
   const data = await ConfigureServices.request(url, errorAction)
    return data.map(this.tranformCurrency)
  }

  tranformCurrency(currency) {
   if(currency.ccy === 'RUR') return {...currency, ccy: 'RUB'}

   return currency
  }
}

const privatbankService = new PrivatbankService()
export default privatbankService
