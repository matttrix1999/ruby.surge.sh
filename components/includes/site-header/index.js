import React, { Component } from 'react'
import { If, When } from 'react-if'
import { Link } from 'react-router'
import { Site } from 'tabler-react'
import isString from 'lodash/isString'
import { navigate } from 'plugins/tabler'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'
import HeaderBrand from 'url-loader!static/header-brand.png'

export default class SiteHeader extends Component {
  render() {
    const { getCurrentUserState } = this.props
    const { login, nickname, avatarUrl } = this.props.user
    return <Site.Header alt={site.title} href="/" imageURL={HeaderBrand} navItems={
      <When condition={getCurrentUserState === 'failure'}>
        <li className="nav-item px-2">
          <Link className="nav-link px-2" to="/login">{i18n.t('login')}</Link>
        </li>
      </When>
    } accountDropdown={login && {
      name: login,
      avatarURL: avatarUrl,
      description: nickname,
      options: [
        { icon: 'user', value: i18n.t('user_profile'), to: `/${login}`, onClick: event => navigate(`/${login}`, { event }) },
        { isDivider: true },
        { icon: 'log-out', value: i18n.t('logout'), to: '/logout' }
      ]
    }} onMenuToggleClick={() => {
    }} />
  }
}
