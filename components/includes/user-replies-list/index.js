import React, { Component, Fragment } from 'react'
import { If, Then, Else } from 'react-if'
import { Link } from 'react-router'
import { List, Media, Text, Avatar } from 'tabler-react'
import i18n from 'helpers/i18n'
import styles from 'components/includes/user-replies-list/styles'

export default class UserRepliesList extends Component {
  render() {
    const { dataSource } = this.props
    return <List.Group className="card-list-group">
      {
        dataSource.map(item => {
          return <List.GroupItem className={styles['list-group-item']} key={item.id} RootComponent="div">
            <Media>
              <Media.Body className="w-100">
                <Media.Heading>
                  <Text.Small className="float-right" muted={true}>{dayjs(item.updatedAt).fromNow()}</Text.Small>
                  <Link to={`/topics/${item.topicId}`}>{item.topicTitle}</Link>
                </Media.Heading>
                <div className="text-wrap mt-2" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
              </Media.Body>
            </Media>
          </List.GroupItem>
        })
      }
    </List.Group>
  }
}
