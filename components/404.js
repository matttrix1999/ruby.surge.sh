import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import { Helmet } from 'react-helmet'
import { Container, Page } from 'tabler-react'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'

export default class __404__ extends Component {
  render() {
    return <Fragment>
      <Helmet>
        <title>{`${i18n.t('this_is_not_the_web_page_you_are_looking_for')} • ${site.title}`}</title>
      </Helmet>
      <Page>
        <Container>
          <div className="px-8 py-9 text-center">
            <h1 className="display-1 text-muted">:(</h1>
            <p className="text-muted">{i18n.t('this_is_not_the_web_page_you_are_looking_for')}</p>
          </div>
        </Container>
      </Page>
    </Fragment>
  }
}
