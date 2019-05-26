import { action, observable } from 'mobx'
import { getToken } from 'helpers/auth'
import { apiUrl } from 'constants/api'
import { User } from 'models/user'

export default class AccountStore {
  @observable currentUser = new User()
  @observable getCurrentUserState = 'prepare'
  @observable followTargetUserState = 'prepare'
  @observable unfollowTargetUserState = 'prepare'

  @action
  getCurrentUser(args = {}, next) {
    this.getCurrentUserState = 'pending'
    client.get(`${apiUrl}/users/me`).query({
      access_token: getToken()
    }).then(response => {
      const { user } = response.body
      this.currentUser = new User({ ...user })
      if (next) { next() }
      this.getCurrentUserState = 'success'
    }).catch(errors => {
      this.getCurrentUserState = 'failure'
    })
  }

  @action
  followTargetUser(args = {}, next) {
    this.followTargetUserState = 'pending'
    client.post(`${apiUrl}/users/${args.login}/follow`).query({
      access_token: getToken()
    }).then(response => {
      if (next) { next() }
      this.followTargetUserState = 'success'
    }).catch(errors => {
      this.followTargetUserState = 'failure'
    })
  }

  @action
  unfollowTargetUser(args = {}, next) {
    this.unfollowTargetUserState = 'pending'
    client.post(`${apiUrl}/users/${args.login}/unfollow`).query({
      access_token: getToken()
    }).then(response => {
      if (next) { next() }
      this.unfollowTargetUserState = 'success'
    }).catch(errors => {
      this.unfollowTargetUserState = 'failure'
    })
  }
}
