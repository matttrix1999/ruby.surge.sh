import React, { Component, Fragment } from 'react'
import { If, Then, Else } from 'react-if'
import { Link } from 'react-router'
import { List, Media, Text, Avatar } from 'tabler-react'
import i18n from 'helpers/i18n'
import styles from 'components/includes/replies-list/styles'

export default class RepliesList extends Component {
  render() {
    const { dataSource } = this.props
    return <List.Group className="card-list-group">
      {
        dataSource.map(item => {
          return <List.GroupItem className={styles['list-group-item']} key={item.id} RootComponent="div">
            <Media>
              <Media.Object className={styles.avatar}>
                <Link to={`/${item.userLogin}`}>
                  <Avatar size="md" imageURL={item.userAvatarUrl} />
                </Link>
              </Media.Object>
              <Media.Body className={styles['media-body']}>
                <Media.Heading>
                  <Text.Small className="float-right" muted={true}>{dayjs(item.updatedAt).fromNow()}</Text.Small>
                  <Link to={`/${item.userLogin}`}>
                    <h5>{item.userLogin}</h5>
                  </Link>
                </Media.Heading>
                <div className="text-wrap" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
              </Media.Body>
            </Media>
          </List.GroupItem>
        })
      }
    </List.Group>
  }
}
