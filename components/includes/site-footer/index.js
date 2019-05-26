import React, { Component, Fragment } from 'react'
import { Button, Grid, List, Site } from 'tabler-react'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'

export function getYear() {
  return dayjs().year()
}

export default class SiteFooter extends Component {
  render() {
    return <Site.Footer nav={
      <Fragment>
        <Grid.Col auto={true}>
          <List inline={true} className="list-inline-dots mb-0">
            <List.Item inline={true}>
              <a href={site.githubUrl} target="_blank">GitHub</a>
            </List.Item>
            <List.Item inline={true}>
              <a href={site.twitterUrl} target="_blank">Twitter</a>
            </List.Item>
            <List.Item inline={true}>
              <a href={site.youtubeUrl} target="_blank">YouTube</a>
            </List.Item>
          </List>
        </Grid.Col>
        <Grid.Col auto={true}>
          <Button href={site.apiDocumentUrl} size="sm" color="outline-info" target="_blank" RootComponent="a">{i18n.t('api_document')}</Button>
        </Grid.Col>
      </Fragment>
    } copyright={site.copyright.replace(/2\d{3}/, getYear())} />
  }
}
