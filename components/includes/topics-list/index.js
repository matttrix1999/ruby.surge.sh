import React, { Component, Fragment } from 'react'
import { If, Then, Else } from 'react-if'
import { Link } from 'react-router'
import { Table, Tag, Text, Avatar } from 'tabler-react'
import i18n from 'helpers/i18n'
import styles from 'components/includes/topics-list/styles'

export default class TopicsList extends Component {
  render() {
    const { dataSource } = this.props
    return <Table cards={true} verticalAlign="center" responsive={true}>
      <Table.Body>
        {
          dataSource.map(item => {
            return <Table.Row key={item.id}>
              <Table.Col className={styles.avatar}>
                <Link to={`/${item.userLogin}`}>
                  <Avatar size="lg" imageURL={item.userAvatarUrl} />
                </Link>
              </Table.Col>
              <Table.Col>
                <div>
                  <Link to={`/topics/${item.id}`}>{item.title}</Link>
                </div>
                <div>
                  <Link to={`/${item.userLogin}`}>
                    <Text.Small color="secondary">{item.userLogin}</Text.Small>
                  </Link>
                  <Text.Small muted={true}> • </Text.Small>
                  <If condition={item.repliesCount === 0}>
                    <Then>
                      <Text.Small muted={true}>{`${i18n.t('published_at')} ${dayjs(item.createdAt).fromNow()}`}</Text.Small>
                    </Then>
                    <Else>
                      <Text.Small muted={true}>{`${i18n.t('last_by')} `}</Text.Small>
                      <Link to={`/${item.lastReplyUserName}`}>
                        <Text.Small color="secondary">{item.lastReplyUserName}</Text.Small>
                      </Link>
                      <Text.Small muted={true}>{` ${i18n.t('replied_at')} ${dayjs(item.repliedAt).fromNow()}`}</Text.Small>
                    </Else>
                  </If>
                </div>
              </Table.Col>
              <Table.Col className="text-right">
                <Tag>{item.repliesCount}</Tag>
              </Table.Col>
            </Table.Row>
          })
        }
      </Table.Body>
    </Table>
  }
}
