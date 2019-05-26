import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, browserHistory } from 'react-router'
import relativeTime from 'dayjs/plugin/relativeTime'
import zh_CN from 'dayjs/locale/zh-cn'
import store from 'models/store'
import styles from 'styles'
import routes from 'routes'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

ReactDOM.render(<Provider {...{ store }}>
  <Router {...{ history: browserHistory, routes }} />
</Provider>, document.getElementById('app'))
