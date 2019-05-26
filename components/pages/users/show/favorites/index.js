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
import TopicsList from 'components/includes/topics-list'
import CardProfile from 'components/includes/card-profile'
import styles from 'components/pages/users/show/favorites/styles'

@inject('store')
@observer
export default class UsersShowFavoritesPage extends Component {
  componentDidMount() {
    const { login } = this.props.params
    const { user } = this.props.store
    user.getTargetUser({ login })
    user.getTargetUserFavorites({ login })
  }

  componentWillReceiveProps({ params }) {
    const { login } = this.props.params
    const { user } = this.props.store

    if (login !== params.login) {
      user.getTargetUser({ login: params.login })
      user.getTargetUserFavorites({ login: params.login })
    }
  }

  render() {
    const { login } = this.props.params
    const { user } = this.props.store
    const { topicsCount, repliesCount, followersCount, followingCount, favoritesCount, isFollowed, isBlocked } = user.targetUser
    return <Fragment>
      <Helmet>
        <title>{`${login} • ${i18n.t('favorites')} • ${site.title}`}</title>
      </Helmet>
      <Page className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <div className="col-lg-3">
              <CardProfile user={user.targetUser} isPending={user.getTargetUserState === 'pending'} />
            </div>
            <div className="col-lg-9">
              <Card className={styles.card}>
                <UserTabs login={login} tabName="favorites" />
                <Dimmer active={user.getTargetUserFavoritesState === 'pending'} loader={true}>
                  <If condition={isEmpty(user.targetUserFavorites)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <TopicsList dataSource={user.targetUserFavorites} />
                      <Card.Footer>
                        <Button block={true} color="secondary" RootComponent="a" href={`${site.originUrl}/${login}/favorites`} target="_blank">{i18n.t('more_favorites')}</Button>
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
