import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { If, Then, Else } from 'react-if'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router'
import { Container, Card, Grid, Dimmer, Button, Page } from 'tabler-react'
import isEmpty from 'lodash/isEmpty'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'
import UserTabs from 'components/includes/user-tabs'
import UsersList from 'components/includes/users-list'
import CardProfile from 'components/includes/card-profile'
import styles from 'components/pages/users/show/followers/styles'

@inject('store')
@observer
export default class UsersShowFollowersPage extends Component {
  componentDidMount() {
    const { login } = this.props.params
    const { user } = this.props.store
    user.getTargetUser({ login })
    user.getTargetUserFollowers({ login })
  }

  componentWillReceiveProps({ params }) {
    const { login } = this.props.params
    const { user } = this.props.store

    if (login !== params.login) {
      user.getTargetUser({ login: params.login })
      user.getTargetUserFollowers({ login: params.login })
    }
  }

  render() {
    const { login } = this.props.params
    const { user } = this.props.store
    const { topicsCount, repliesCount, followersCount, followingCount, favoritesCount, isFollowed, isBlocked } = user.targetUser
    return <Fragment>
      <Helmet>
        <title>{`${login} • ${i18n.t('followers')} • ${site.title}`}</title>
      </Helmet>
      <Page className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <div className="col-lg-3">
              <CardProfile user={user.targetUser} isPending={user.getTargetUserState === 'pending'} />
            </div>
            <div className="col-lg-9">
              <Card className={styles.card}>
                <UserTabs login={login} tabName="followers" />
                <Dimmer active={user.getTargetUserFollowersState === 'pending'} loader={true}>
                  <If condition={isEmpty(user.targetUserFollowers)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <UsersList dataSource={user.targetUserFollowers} />
                      <Card.Footer>
                        <Button block={true} color="secondary" RootComponent="a" href={`${site.originUrl}/${login}/followers`} target="_blank">{i18n.t('more_followers')}</Button>
                      </Card.Footer>
                    </Else>
                  </If>
                </Dimmer>
              </Card>
            </div>
          </Grid.Row>
        </Container>
      </Page>
    </Fragment>
  }
}
