import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import { BackTop } from 'antd'
import i18n from 'helpers/i18n'
import SiteHeader from 'components/includes/site-header'
import SiteFooter from 'components/includes/site-footer'

@inject('store')
@observer
export default class AppPage extends Component {
  componentDidMount() {
    const { account } = this.props.store
    account.getCurrentUser()
  }

  render() {
    const { account } = this.props.store
    const { currentUser, getCurrentUserState } = account
    return <Fragment>
      <SiteHeader user={currentUser} {...{ getCurrentUserState }} />
      {
        this.props.children
      }
      <SiteFooter />
      <BackTop />
    </Fragment>
  }
}
