import { action, observable } from 'mobx'
import { browserHistory } from 'react-router'
import { getPaginationParams } from 'helpers'
import { getToken } from 'helpers/auth'
import { apiUrl } from 'constants/api'
import { Reply } from 'models/reply'

export class Topic {
  @observable id
  @observable title
  @observable body
  @observable bodyHtml
  @observable hitsCount
  @observable likesCount
  @observable repliesCount
  @observable userId
  @observable userName
  @observable userLogin
  @observable userAvatarUrl
  @observable lastReplyUserName
  @observable repliedAt
  @observable createdAt
  @observable updatedAt

  constructor(args = {}) {
    this.id = args.id
    this.title = args.title
    this.body = args.body
    this.bodyHtml = args.body_html
    this.hitsCount = args.hits || 0
    this.likesCount = args.likes_count || 0
    this.repliesCount = args.replies_count || 0
    this.userId = args.user?.id
    this.userName = args.user?.name
    this.userLogin = args.user?.login
    this.userAvatarUrl = args.user?.avatar_url?.replace(/large$/, 'md')
    this.lastReplyUserName = args.last_reply_user_login
    this.repliedAt = args.replied_at
    this.createdAt = args.created_at
    this.updatedAt = args.updated_at
  }
}

export default class TopicStore {
  @observable topics = []
  @observable targetTopic = new Topic()
  @observable targetTopicReplies = []
  @observable getTopicsState = 'prepare'
  @observable getTargetTopicState = 'prepare'
  @observable getTargetTopicRepliesState = 'prepare'
  @observable getTargetTopicRepliesManuallyState = 'prepare'

  @action
  getTopics(args = {}, next) {
    this.getTopicsState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    const currentTab = args.tab || 'last_actived'
    const type = {
      latest: 'recent',
      no_replies: 'no_reply'
    }[currentTab] || currentTab
    client.get(`${apiUrl}/topics`).query({
      node_id: args.category_id,
      offset,
      limit,
      type
    }).then(response => {
      const { topics } = response.body
      this.topics = topics.map(item => new Topic(item))
      if (next) { next() }
      this.getTopicsState = 'success'
    }).catch(errors => {
      this.getTopicsState = 'failure'
    })
  }

  @action
  getTargetTopic(args = {}, next) {
    this.getTargetTopicState = 'pending'
    client.get(`${apiUrl}/topics/${args.id}`).then(response => {
      const { topic, meta } = response.body
      this.targetTopic = new Topic({ ...topic, ...meta })
      if (next) { next({ topic }) }
      this.getTargetTopicState = 'success'
    }).catch(errors => {
      if (errors.response?.statusCode === 404) {
        browserHistory.replace('/topics')
      }
      this.getTargetTopicState = 'failure'
    })
  }

  @action
  getTargetTopicReplies(args = {}, next) {
    this.getTargetTopicRepliesState = 'pending'
    const { offset, limit } = getPaginationParams(args)
    client.get(`${apiUrl}/topics/${args.id}/replies`).query({
      offset,
      limit
    }).then(response => {
      const { replies } = response.body
      this.targetTopicReplies = replies.map(item => new Reply(item))
      this.getTargetTopicRepliesState = 'success'
    }).catch(errors => {
      this.getTargetTopicRepliesState = 'failure'
    })
  }

  @action
  getTargetTopicRepliesManually(args = {}, next) {
    this.getTargetTopicRepliesManuallyState = 'pending'
    client.get(`${apiUrl}/topics/${args.id}/replies`).query({
      offset: this.targetTopicReplies.length
    }).then(response => {
      const { replies } = response.body
      this.targetTopicReplies = this.targetTopicReplies.concat(replies.map(item => new Reply(item)))
      this.getTargetTopicRepliesManuallyState = 'success'
    }).catch(errors => {
      this.getTargetTopicRepliesManuallyState = 'failure'
    })
  }
}
