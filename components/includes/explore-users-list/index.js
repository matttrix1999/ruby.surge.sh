import React, { Component, Fragment } from 'react'
import { If, Then, Else, When } from 'react-if'
import { Link } from 'react-router'
import { Table, Tag, Text, Avatar } from 'tabler-react'
import isString from 'lodash/isString'
import i18n from 'helpers/i18n'
import styles from 'components/includes/explore-users-list/styles'

export default class ExploreUsersList extends Component {
  render() {
    const { dataSource } = this.props
    const colors = ['red', 'orange', 'yellow']
    return <Table cards={true} verticalAlign="center" responsive={true}>
      <Table.Body>
        {
          dataSource.map((item, index) => {
            return <Table.Row key={item.id}>
              <Table.Col className={styles.avatar}>
                <a href={`/${item.login}`} target="_blank">
                  <Avatar size="lg" imageURL={item.avatarUrl} />
                </a>
              </Table.Col>
              <Table.Col>
                <div>
                  <Link to={`/${item.login}`}>{item.nickname}</Link>
                </div>
                <div>
                  <Link to={`/${item.login}`}>
                    <Text.Small color="secondary">{item.login}</Text.Small>
                  </Link>
                </div>
              </Table.Col>
              <Table.Col className="text-right">
                <When condition={isString(colors[index])}>
                  <Tag color={colors[index]}>{index + 1}</Tag>
                </When>
              </Table.Col>
            </Table.Row>
          })
        }
      </Table.Body>
    </Table>
  }
}
