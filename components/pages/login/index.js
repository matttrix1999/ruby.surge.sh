import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import { Helmet } from 'react-helmet'
import isEmail from 'validator/lib/isEmail'
import { Container, Grid, Page } from 'tabler-react'
import * as site from 'constants/site'
import i18n from 'helpers/i18n'
import LoginForm from 'components/includes/login-form'

@inject('store')
@observer
export default class LoginPage extends Component {
  componentDidMount() {
    const { account } = this.props.store
    account.getCurrentUser({}, () => {
      browserHistory.replace('/topics')
    })
  }

  render() {
    const { auth } = this.props.store
    return <Fragment>
      <Helmet>
        <title>{`${i18n.t('login')} • ${site.title}`}</title>
      </Helmet>
      <Page>
        <Page className="page-single">
          <Container>
            <Grid.Row>
              <Grid.Col className="col-login mx-auto">
                <LoginForm strings={{
                  title: i18n.t('site_name'),
                  buttonText: i18n.t('login'),
                  emailLabel: i18n.t('username'),
                  emailPlaceholder: i18n.t('username_placeholder'),
                  passwordLabel: i18n.t('password'),
                  passwordPlaceholder: i18n.t('password_placeholder')
                }} isPending={auth.loginState === 'pending'} onSubmit={(event) => {
                  event.preventDefault()
                  const email = event.target.email?.value
                  const username = isEmail(email) ? '' : email
                  const password = event.target.password?.value
                  auth.login({ username, password })
                }} />
              </Grid.Col>
            </Grid.Row>
          </Container>
        </Page>
      </Page>
    </Fragment>
  }
}
