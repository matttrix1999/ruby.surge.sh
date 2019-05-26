import React, { Component, Fragment } from 'react'
import { If, Then, Else, When, Unless } from 'react-if'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router'
import { Divider } from 'antd'
import { Button, Container, Card, Grid, Dimmer, Header, Icon, Nav, Page, Profile, Text } from 'tabler-react'
// import MarkdownEditor from 'react-mde'
import isString from 'lodash/isString'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'
import RepliesList from 'components/includes/replies-list'
import CardProfile from 'components/includes/card-profile'
import styles from 'components/pages/topics/show/styles'

export function iconProvider(name) {
  return {
    'heading': <Icon name="feather" />,
    'bold': <Icon name="bold" />,
    'italic': <Icon name="italic" />,
    'strikethrough': <Icon name="underline" />,
    'link': <Icon name="link" />,
    'quote-right': <Icon name="link" />,
    'code': <Icon name="code" />,
    'image': <Icon name="image" />,
    'list-ul': <Icon name="list" />,
    'list-ol': <Icon name="list" />,
    'tasks': <Icon name="check-square" />
  }[name] || '?'
}

@inject('store')
@observer
export default class TopicsShowPage extends Component {
  componentDidMount() {
    const { topic, user } = this.props.store
    topic.getTargetTopic({ id: this.props.params.id }, ({ topic }) => {
      const login = topic.user?.login
      user.getTargetUser({ login })
    })
    topic.getTargetTopicReplies({ id: this.props.params.id })
  }

  render() {
    const { account, topic, reply, user } = this.props.store
    const { title, bodyHtml, userName, userLogin, userAvatarUrl, lastReplyUserName, hitsCount, likesCount, repliesCount, repliedAt, createdAt } = topic.targetTopic
    return <Fragment>
      <Helmet>
        <title>{`${title || i18n.t('topics')} • ${site.title}`}</title>
      </Helmet>
      <Page className="my-3 my-md-5">
        <Container>
          <Grid.Row>
            <div className="col-lg-9">
              <Card>
                <Dimmer active={topic.getTargetTopicState === 'pending'} loader={true}>
                  <If condition={topic.getTargetTopicState === 'pending'}>
                    <Then>
                      <Card.Body>
                        <div className="py-3" />
                      </Card.Body>
                    </Then>
                    <Else>
                      <Card.Header className={styles['card-header']}>
                        <Header.H3 className={styles['card-title']}>{title}</Header.H3>
                        <div className="mb-1">
                          <Link to={`/${userLogin}`}>
                            <Text.Small color="secondary">{userLogin}</Text.Small>
                          </Link>
                          <Text.Small muted={true}> • </Text.Small>
                          <Text.Small muted={true}>{`${i18n.t('published_at')} ${dayjs(createdAt).fromNow()}`}</Text.Small>
                          <Text.Small muted={true}> • </Text.Small>
                          <Text.Small muted={true}>{`${i18n.t('last_by')} `}</Text.Small>
                          <Link to={`/${lastReplyUserName}`}>
                            <Text.Small color="secondary">{lastReplyUserName}</Text.Small>
                          </Link>
                          <Text.Small muted={true}>{` ${i18n.t('replied_at')} ${dayjs(repliedAt).fromNow()}`}</Text.Small>
                        </div>
                      </Card.Header>
                      <Card.Body className={styles['card-body']}>
                        <div className="text-wrap" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                      </Card.Body>
                      <Card.Footer>
                        <span>{`${i18n.t('favorites')} ${likesCount}`}</span>
                        <Divider type="vertical" />
                        <span>{`${i18n.t('hits_count')} ${hitsCount}`}</span>
                      </Card.Footer>
                    </Else>
                  </If>
                </Dimmer>
              </Card>
              <Unless condition={topic.getTargetTopicState === 'pending'}>
                <Card>
                  <Card.Header>
                    <Card.Title>{`${i18n.t('replies')} ${repliesCount}`}</Card.Title>
                  </Card.Header>
                  <If condition={repliesCount === 0}>
                    <Then>
                      <Card.Body>
                        <Divider className="my-2 text-muted">{i18n.t('no_replies')}</Divider>
                      </Card.Body>
                    </Then>
                    <Else>
                      <Dimmer active={topic.getTargetTopicRepliesState === 'pending'} loader={true}>
                        <If condition={topic.getTargetTopicRepliesState === 'pending'}>
                          <Then>
                            <Card.Body>
                              <div className="py-3" />
                            </Card.Body>
                          </Then>
                          <Else>
                            <RepliesList dataSource={topic.targetTopicReplies} />
                            <Card.Footer>
                              <If condition={topic.targetTopicReplies.length < repliesCount}>
                                <Then>
                                  <Button block={true} color="secondary" loading={topic.getTargetTopicRepliesManuallyState === 'pending'} onClick={() => {
                                    topic.getTargetTopicRepliesManually({ id: this.props.params.id })
                                  }}>{i18n.t('load_more')}</Button>
                                </Then>
                                <Else>
                                  <Divider className="text-muted">{i18n.t('no_more')}</Divider>
                                </Else>
                              </If>
                            </Card.Footer>
                          </Else>
                        </If>
                      </Dimmer>
                    </Else>
                  </If>
                </Card>
                {/* <Card>
                  <MarkdownEditor layout="noPreview" buttonContentOptions={{ iconProvider }} editorState={reply.editorState} onChange={state => reply.updateEditorState(state)} />
                </Card> */}
              </Unless>
            </div>
            <div className="col-lg-3">
              <CardProfile user={user.targetUser} isPending={user.getTargetUserState === 'pending'} onFollow={() => {
              }} onUnfollow={() => {
              }} />
            </div>
          </Grid.Row>
        </Container>
      </Page>
    </Fragment>
  }
}
