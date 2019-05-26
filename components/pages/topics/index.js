import React, { Component, Fragment } from 'react'
import { Link, browserHistory } from 'react-router'
import { If, Then, Else, When } from 'react-if'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { Pagination } from 'antd'
import { Container, Card, Grid, Dimmer, Nav, Page, Tag, Button } from 'tabler-react'
import { stringify } from 'query-string'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import find from 'lodash/find'
import classNames from 'classnames'
import * as site from 'constants/site'
import { navigate } from 'plugins/tabler'
import { getPaginationParams } from 'helpers'
import i18n from 'helpers/i18n'
import TopicsList from 'components/includes/topics-list'
import styles from 'components/pages/topics/styles'

@inject('store')
@observer
export default class TopicsPage extends Component {
  componentDidMount() {
    const { query } = this.props.location
    const { category, topic } = this.props.store
    category.getCategories()
    topic.getTopics({ ...query })
  }

  componentWillReceiveProps({ location }) {
    const { query, search } = this.props.location
    const { topic } = this.props.store
    if (search !== location.search) {
      topic.getTopics({ ...location.query })
    }
  }

  render() {
    const { query } = this.props.location
    const { category, setting, topic } = this.props.store
    const { page, perPage } = getPaginationParams(query)
    const targetCategory = find(category.categories, item => item.id === ~~query.category_id)
    return <Fragment>
      <Helmet>
        <title>{`${i18n.t('topics')} • ${site.title}`}</title>
      </Helmet>
      <Page className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <div className="col-lg-3 order-lg-1">
              <Card>
                <Card.Header>
                  <Card.Title>{i18n.t('popular_tags')}</Card.Title>
                  <When condition={!! query.category_id}>
                    <Card.Options>
                      <Link to="/topics">
                        <Button color="secondary" size="sm">{i18n.t('clear')}</Button>
                      </Link>
                    </Card.Options>
                  </When>
                </Card.Header>
                <Dimmer active={category.getCategoriesState === 'pending'} loader={true}>
                  <If condition={isEmpty(category.categories)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <Card.Body>
                        <Tag.List>
                          {
                            uniqBy(category.popularCategories.concat(targetCategory ? [targetCategory] : []), 'id').map(item => {
                              if (~~query.category_id === item.id) {
                                return <Tag key={item.id} color="gray-dark">{item.name}</Tag>
                              }
                              return <Link className="tag" key={item.id} to={`/topics?${stringify({ ...query, category_id: item.id, page: 1, total: item.topicsCount })}`}>{item.name}</Link>
                            })
                          }
                        </Tag.List>
                      </Card.Body>
                      <Card.Footer>
                        <Button block={true} color="secondary" RootComponent="a" href="/explore" onClick={(event) => {
                          event.preventDefault()
                          browserHistory.push('/explore')
                        }}>{i18n.t('all_tags')}</Button>
                      </Card.Footer>
                    </Else>
                  </If>
                </Dimmer>
              </Card>
            </div>
            <div className="col-lg-9">
              <Card className={styles.card}>
                <div className={`px-3 ${styles['card-nav']}`}>
                  <Nav className={`px-2 ${styles['nav-tabs']}`}>
                    <li className="nav-item">
                      <Link className={classNames('nav-link', {
                        active: ! query.tab
                      })} to={`/topics?${stringify({ category_id: query.category_id, page: 1 })}`}>{i18n.t('nav_item_default_topics')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={classNames('nav-link', {
                        active: query.tab === 'popular'
                      })} to={`/topics?${stringify({ ...query, tab: 'popular', page: 1 })}`}>{i18n.t('nav_item_popular_topics')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={classNames('nav-link', {
                        active: query.tab === 'excellent'
                      })} to={`/topics?${stringify({ ...query, tab: 'excellent', page: 1 })}`}>{i18n.t('nav_item_excellent_topics')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={classNames('nav-link', {
                        active: query.tab === 'latest'
                      })} to={`/topics?${stringify({ ...query, tab: 'latest', page: 1 })}`}>{i18n.t('nav_item_latest_topics')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={classNames('nav-link', {
                        active: query.tab === 'no_replies'
                      })} to={`/topics?${stringify({ ...query, tab: 'no_replies', page: 1 })}`}>{i18n.t('nav_item_no_replies_topics')}</Link>
                    </li>
                  </Nav>
                </div>
                <Dimmer active={topic.getTopicsState === 'pending'} loader={true}>
                  <If condition={isEmpty(topic.topics)}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <TopicsList dataSource={topic.topics} />
                    </Else>
                  </If>
                </Dimmer>
                <When condition={topic.topics.length > 0}>
                  <Card.Footer>
                    <Pagination className="text-center" current={page} pageSize={perPage} size={setting.isMobile ? 'small' : ''} total={~~query.total || 8192} onChange={(page, perPage) => {
                      browserHistory.push(`/topics?${stringify({ ...query, page })}`)
                    }} />
                  </Card.Footer>
                </When>
              </Card>
            </div>
          </Grid.Row>
        </Container>
      </Page>
    </Fragment>
  }
}
