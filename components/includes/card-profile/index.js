import React, { Component, Fragment } from 'react'
import { If, Then, Else } from 'react-if'
import { Button, Card, Dimmer, Profile } from 'tabler-react'
import isString from 'lodash/isString'
import classNames from 'classnames'
import i18n from 'helpers/i18n'

export default class CardProfile extends Component {
  render() {
    const { user, isPending, onFollow, onUnfollow } = this.props
    const { nickname, avatarUrl, tagline, isFollowed, isBlocked, createdAt, updatedAt } = user
    return <Card className="card-profile">
      <Card.Header backgroundURL={avatarUrl} />
      <Card.Body className="text-center">
        <Dimmer active={isPending} loader={true}>
          <If condition={isString(avatarUrl)}>
            <Then>
              <Profile.Image avatarURL={avatarUrl} />
              <h3 className="mb-3">{nickname}</h3>
              <p className="mb-4">{tagline}</p>
              <If condition={isFollowed}>
                <Then>
                  <Button color="primary" onClick={() => {
                    if (onUnfollow) { onUnfollow() }
                  }}>{i18n.t('unfollow')}</Button>
                </Then>
                <Else>
                  <Button color="primary" disabled={true} outline={true} onClick={() => {
                    if (onFollow) { onFollow() }
                  }}>{i18n.t('follow')}</Button>
                </Else>
              </If>
            </Then>
            <Else>
              <div className="py-3" />
            </Else>
          </If>
        </Dimmer>
      </Card.Body>
    </Card>
  }
}
