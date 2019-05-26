import { action, observable } from 'mobx'
import { browserHistory } from 'react-router'
import { message } from 'antd'
import * as site from 'constants/site'
import { apiUrl } from 'constants/api'
import i18n from 'helpers/i18n'

export default class AuthStore {
  @observable loginState = 'prepare'

  @action
  login(args = {}, next) {
    this.loginState = 'pending'
    client.post(`${site.url.replace(/surge.sh/, 'leanapp.cn')}/sessions`).send(args).then(response => {
      const { access_token, refresh_token } = response.body
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('access_token', access_token)
      browserHistory.replace('/')
      if (next) { next() }
      this.loginState = 'success'
    }).catch(errors => {
      this.loginState = 'failure'
      message.warning(i18n.t('invalid_username_or_password'))
    }).finally(() => {
    })
  }
}
