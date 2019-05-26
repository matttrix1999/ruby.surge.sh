import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, browserHistory } from 'react-router'
import store from 'models/store'
import routes from 'routes/mobile'
import styles from 'styles/mobile'

ReactDOM.render(<Provider {...{ store }}>
  <Router {...{ history: browserHistory, routes }} />
</Provider>, document.getElementById('app'))
