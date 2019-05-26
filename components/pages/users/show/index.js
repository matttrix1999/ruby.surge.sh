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
export default class UsersShowPage extends Component {
  componentDidMount() {
    const { login } = this.props.params
    const { user } = this.props.store
    user.getTargetUser({ login })
    user.getTargetUserTopics({ login })
  }

  componentWillReceiveProps({ params }) {
    const { login } = this.props.params
    const { user } = this.props.store

    if (login !== params.login) {
      user.getTargetUser({ login: params.login })
      user.getTargetUserTopics({ login: params.login })
    }
  }

  render() {
    const { login } = this.props.params
    const { account, user } = this.props.store
    const { topicsCount, repliesCount, followersCount, followingCount, favoritesCount, isFollowed, isBlocked } = user.targetUser
    return <Fragment>
      <Helmet>
        <title>{`${login} • ${site.title}`}</title>
      </Helmet>
      <Page className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <div className="col-lg-3">
              <CardProfile user={user.targetUser} isPending={user.getTargetUserState === 'pending'} onFollow={() => {
                account.followTargetUser({ login })
              }} onUnfollow={() => {
              }} />
            </div>
            <div className="col-lg-9">
              <Card className={styles.card}>
                <UserTabs login={login} tabName="topics" />
                <Dimmer active={user.getTargetUserTopicsState === 'pending'} loader={true}>
                  <If condition={isEmpty(user.targetUserTopics)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <TopicsList dataSource={user.targetUserTopics} />
                      <Card.Footer>
                        <Button block={true} color="secondary" RootComponent="a" href={`${site.originUrl}/${login}/topics`} target="_blank">{i18n.t('more_topics')}</Button>
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
