import React, { Component } from 'react'
import { Divider } from 'antd'
import { Form, FormTextInput, Card, Button } from 'tabler-react'
import * as defaultStrings from 'components/includes/login-form/strings'

export default class LoginForm extends Component {
  render() {
    const { strings, values, isPending, onSubmit } = this.props
    return <Form className="card" onSubmit={onSubmit}>
      <Card.Status color="primary" />
      <Card.Body className="p6">
        <Divider>{strings?.title || defaultStrings.title}</Divider>
        <FormTextInput icon="user" name="email" {...{
          value: values?.email,
          label: strings?.emailLabel || defaultStrings.emailLabel,
          placeholder: strings?.emailPlaceholder || defaultStrings.emailPlaceholder
        }} />
        <FormTextInput icon="lock" type="password" name="password" {...{
          value: values?.password,
          label: strings?.passwordLabel || defaultStrings.passwordLabel,
          placeholder: strings?.passwordPlaceholder || defaultStrings.passwordPlaceholder
        }} />
        <Form.Footer>
          <Button type="submit" color="primary" block={true} loading={isPending}>{strings?.buttonText || defaultStrings.buttonText}</Button>
        </Form.Footer>
      </Card.Body>
    </Form>
  }
}
