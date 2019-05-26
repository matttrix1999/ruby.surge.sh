import { action, observable } from 'mobx'
import { getToken } from 'helpers/auth'
import { apiUrl } from 'constants/api'

export class Notification {
  @observable id
  @observable name
  @observable createdAt
  @observable updatedAt

  constructor(args = {}) {
    this.id = args.id
    this.name = args.name
    this.createdAt = args.created_at
    this.updatedAt = args.updated_at
  }
}

export default class NotificationStore {
  @observable notifications = []
  @observable targetNotification = new Notification()

  @action
  getNotifications(args = {}, next) {
    client.get(`${apiUrl}/notifications`).query({}).then(response => {
      const { notifications } = response.body
      this.notifications = notifications.map(item => new Notification(item))
    }).catch(errors => {
    })
  }

  @action
  getTargetNotification(args = {}, next) {
    client.get(`${apiUrl}/notifications/${args.id}`).then(response => {
      const { notification, meta } = response.body
      this.targetNotification = new Notification({ ...notification, ...meta })
    }).catch(errors => {
    })
  }
}
