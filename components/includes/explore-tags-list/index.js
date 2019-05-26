import React, { Component, Fragment } from 'react'
import { If, Then, Else, When } from 'react-if'
import { Link } from 'react-router'
import { Table, Tag, Text, Avatar } from 'tabler-react'
import { stringify } from 'query-string'
import groupBy from 'lodash/groupBy'
import values from 'lodash/values'
import i18n from 'helpers/i18n'
import styles from 'components/includes/explore-tags-list/styles'

export default class ExploreTagsList extends Component {
  render() {
    const { dataSource } = this.props
    return <Table cards={true}>
      <Table.Body>
        {
          values(groupBy(dataSource, 'parentName')).map(item => {
            return <Table.Row key={item[0].parentId}>
              <Table.Col className={`text-right ${styles['parent-name']}`}>
                <Text muted={true}>{item[0].parentName}</Text>
              </Table.Col>
              <Table.Col>
                <Tag.List>
                  {
                    item.map(tag => {
                      return <Link className="tag" key={tag.id} to={`/topics?${stringify({ category_id: tag.id, total: tag.topicsCount })}`}>{tag.name}</Link>
                    })
                  }
                </Tag.List>
              </Table.Col>
            </Table.Row>
          })
        }
      </Table.Body>
    </Table>
  }
}
