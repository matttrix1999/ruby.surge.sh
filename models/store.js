import AuthStore from 'models/auth'
import UserStore from 'models/user'
import TopicStore from 'models/topic'
import ReplyStore from 'models/reply'
import AccountStore from 'models/account'
import SettingStore from 'models/setting'
import CategoryStore from 'models/category'
import NotificationStore from 'models/notification'

export class Store {
  constructor() {
    this.auth = new AuthStore()
    this.user = new UserStore()
    this.topic = new TopicStore()
    this.reply = new ReplyStore()
    this.account = new AccountStore()
    this.setting = new SettingStore()
    this.category = new CategoryStore()
    this.notification = new NotificationStore()
  }
}

export default new Store()
