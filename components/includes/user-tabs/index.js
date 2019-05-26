import React, { Component, Fragment } from 'react'
import { Link } from 'react-router'
import { Nav } from 'tabler-react'
import classNames from 'classnames'
import i18n from 'helpers/i18n'

export default class UserTabs extends Component {
  render() {
    const { login, tabName } = this.props
    return <div className="px-3">
      <Nav className="px-2">
        <li className="nav-item">
          <Link className={classNames('nav-link', { active: tabName === 'topics' })} to={`/${login}`}>{i18n.t('nav_item_user_topics')}</Link>
        </li>
        <li className="nav-item">
          <Link className={classNames('nav-link', { active: tabName === 'replies' })} to={`/${login}/replies`}>{i18n.t('nav_item_user_replies')}</Link>
        </li>
        <li className="nav-item">
          <Link className={classNames('nav-link', { active: tabName === 'favorites' })} to={`/${login}/favorites`}>{i18n.t('nav_item_user_favorites')}</Link>
        </li>
        <li className="nav-item">
          <Link className={classNames('nav-link', { active: tabName === 'followers' })} to={`/${login}/followers`}>{i18n.t('nav_item_user_followers')}</Link>
        </li>
        <li className="nav-item">
          <Link className={classNames('nav-link', { active: tabName === 'following' })} to={`/${login}/following`}>{i18n.t('nav_item_user_following')}</Link>
        </li>
      </Nav>
    </div>
  }
}
