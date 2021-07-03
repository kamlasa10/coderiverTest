import axios from 'axios';

class ConfigureServices {
  static baseConfigureRequest = axios.create({
    baseURL: ' https://api.privatbank.ua/p24api',
    headers: {
      Accept: 'application/json'
    }
  });

  static  async request(url, errorAction) {
    try {
      const res = await ConfigureServices.baseConfigureRequest.get(url)
      return res.data
    } catch(e) {
      errorAction()
    }
  }
}

export default ConfigureServices
