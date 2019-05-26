import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { If, Then, Else } from 'react-if'
import { Helmet } from 'react-helmet'
import { Button, Container, Card, Grid, Dimmer, Page } from 'tabler-react'
import isEmpty from 'lodash/isEmpty'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'
import ExploreTagsList from 'components/includes/explore-tags-list'
import ExploreUsersList from 'components/includes/explore-users-list'
import styles from 'components/pages/explore/styles'

@inject('store')
@observer
export default class Explore extends Component {
  componentDidMount() {
    const { category, user } = this.props.store
    category.getCategories()
    user.getUsers()
  }

  render() {
    const { category, user } = this.props.store
    return <Fragment>
      <Helmet>
        <title>{`${i18n.t('explore')} • ${site.title}`}</title>
      </Helmet>
      <Page className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <div className="col-lg-9">
              <Card className={styles.card} title={i18n.t('all_tags')}>
                <Dimmer active={category.getCategoriesState === 'pending'} loader={true}>
                  <If condition={isEmpty(category.categories)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <ExploreTagsList dataSource={category.categories} />
                    </Else>
                  </If>
                </Dimmer>
              </Card>
            </div>
            <div className="col-lg-3">
              <Card className={styles.card} title={i18n.t('popular_users')}>
                <Dimmer active={user.getUsersState === 'pending'} loader={true}>
                  <If condition={isEmpty(user.users)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <ExploreUsersList dataSource={user.users} />
                      <Card.Footer>
                        <Button block={true} color="secondary" RootComponent="a" href={`${site.originUrl}/users`} target="_blank">{i18n.t('more_users')}</Button>
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
