import { action, observable } from 'mobx'
import { browserHistory } from 'react-router'
import { getPaginationParams } from 'helpers'
import { getToken } from 'helpers/auth'
import { apiUrl } from 'constants/api'
import { Topic } from 'models/topic'
import { Reply } from 'models/reply'

export class User {
  @observable id
  @observable name
  @observable login
  @observable nickname
  @observable avatarUrl
  @observable tagline
  @observable topicsCount
  @observable repliesCount
  @observable followersCount
  @observable followingCount
  @observable favoritesCount
  @observable isFollowed
  @observable isBlocked
  @observable createdAt
  @observable updatedAt

  constructor(args = {}) {
    this.id = args.id
    this.name = args.name
    this.login = args.login
    this.nickname = args.name
    this.avatarUrl = args.avatar_url?.replace(/large$/, 'md')
    this.tagline = args.tagline
    this.topicsCount = args.topics_count || 0
    this.repliesCount = args.replies_count || 0
    this.followersCount = args.followers_count || 0
    this.followingCount = args.following_count || 0
    this.favoritesCount = args.favorites_count || 0
    this.isFollowed = !! args.followed
    this.isBlocked = !! args.blocked
    this.createdAt = args.created_at
    this.updatedAt = args.updated_at
  }
}

export default class UserStore {
  @observable users = []
  @observable targetUser = new User()
  @observable targetUserTopics = []
  @observable targetUserReplies = []
  @observable targetUserFollowers = []
  @observable targetUserFollowing = []
  @observable targetUserFavorites = []
  @observable getUsersState = 'prepare'
  @observable getTargetUserState = 'prepare'
  @observable getTargetUserTopicsState = 'prepare'
  @observable getTargetUserRepliesState = 'prepare'
  @observable getTargetUserFollowersState = 'prepare'
  @observable getTargetUserFollowingState = 'prepare'
  @observable getTargetUserFavoritesState = 'prepare'

  @action
  getUsers(args = {}, next) {
    this.getUsersState = 'pending'
    client.get(`${apiUrl}/users`).query({}).then(response => {
      const { users } = response.body
      this.users = users.map(item => new User(item))
      this.getUsersState = 'success'
    }).catch(errors => {
      this.getUsersState = 'failure'
    })
  }

  @action
  getTargetUser(args = {}, next) {
    this.getTargetUserState = 'pending'
    client.get(`${apiUrl}/users/${args.login}`).then(response => {
      const { user, meta } = response.body
      this.targetUser = new User({ ...user, ...meta })
      this.getTargetUserState = 'success'
    }).catch(errors => {
      if (errors.response?.statusCode === 404) {
        browserHistory.replace('/topics')
      }
      this.getTargetUserState = 'failure'
    })
  }

  @action
  getTargetUserTopics(args = {}, next) {
    this.getTargetUserTopicsState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    client.get(`${apiUrl}/users/${args.login}/topics`).query({
      offset,
      limit
    }).then(response => {
      const { topics } = response.body
      this.targetUserTopics = topics.map(item => new Topic(item))
      this.getTargetUserTopicsState = 'success'
    }).catch(errors => {
      this.getTargetUserTopicsState = 'failure'
    })
  }

  @action
  getTargetUserReplies(args = {}, next) {
    this.getTargetUserRepliesState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    client.get(`${apiUrl}/users/${args.login}/replies`).query({
      offset,
      limit
    }).then(response => {
      const { replies } = response.body
      this.targetUserReplies = replies.map(item => new Reply(item))
      this.getTargetUserRepliesState = 'success'
    }).catch(errors => {
      this.getTargetUserRepliesState = 'failure'
    })
  }

  @action
  getTargetUserFollowers(args = {}, next) {
    this.getTargetUserFollowersState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    client.get(`${apiUrl}/users/${args.login}/followers`).query({
      offset,
      limit
    }).then(response => {
      const { followers } = response.body
      this.targetUserFollowers = followers.map(item => new User(item))
      this.getTargetUserFollowersState = 'success'
    }).catch(errors => {
      this.getTargetUserFollowersState = 'failure'
    })
  }

  @action
  getTargetUserFollowing(args = {}, next) {
    this.getTargetUserFollowingState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    client.get(`${apiUrl}/users/${args.login}/following`).query({
      offset,
      limit
    }).then(response => {
      const { following } = response.body
      this.targetUserFollowing = following.map(item => new User(item))
      this.getTargetUserFollowingState = 'success'
    }).catch(errors => {
      this.getTargetUserFollowingState = 'failure'
    })
  }

  @action
  getTargetUserFavorites(args = {}, next) {
    this.getTargetUserFavoritesState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    client.get(`${apiUrl}/users/${args.login}/favorites`).query({
      offset,
      limit
    }).then(response => {
      const { topics } = response.body
      this.targetUserFavorites = topics.map(item => new Topic(item))
      this.getTargetUserFavoritesState = 'success'
    }).catch(errors => {
      this.getTargetUserFavoritesState = 'failure'
    })
  }
}
