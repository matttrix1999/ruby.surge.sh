import { browserHistory } from 'react-router'

export function navigate(to, args = {}) {
  const { event, replace } = args
  event?.preventDefault()
  browserHistory.push(to)
}
