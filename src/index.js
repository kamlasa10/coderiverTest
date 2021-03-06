import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App'
import {Provider} from 'react-redux'
import store from './store'

import './defaultStyles.scss'

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
