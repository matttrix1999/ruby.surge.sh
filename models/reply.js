import { action, observable } from 'mobx'
import { getToken } from 'helpers/auth'
import { apiUrl } from 'constants/api'

export class Reply {
  @observable id
  @observable body
  @observable bodyHtml
  @observable likesCount
  @observable userId
  @observable userName
  @observable userLogin
  @observable userAvatarUrl
  @observable topicId
  @observable topicTitle
  @observable createdAt
  @observable updatedAt

  constructor(args = {}) {
    this.id = args.id
    this.body = args.body
    this.bodyHtml = args.body_html
    this.likesCount = args.likes_count || 0
    this.userId = args.user?.id
    this.userName = args.user?.name
    this.userLogin = args.user?.login
    this.userAvatarUrl = args.user?.avatar_url?.replace(/large$/, 'md')
    this.topicId = args.topic_id
    this.topicTitle = args.topic_title
    this.createdAt = args.created_at
    this.updatedAt = args.updated_at
  }
}

export default class ReplyStore {
  @observable replies = []
  @observable targetReply = new Reply()
  @observable editorState = { markdown: '' }

  @action
  getReplies(args = {}, next) {
    client.get(`${apiUrl}/replies`).query({}).then(response => {
      const { replies } = response.body
      this.replies = replies.map(item => new Reply(item))
    }).catch(errors => {
    })
  }

  @action
  getTargetReply(args = {}, next) {
    client.get(`${apiUrl}/replies/${args.id}`).then(response => {
      const { reply, meta } = response.body
      this.targetReply = new Reply({ ...reply, ...meta })
    }).catch(errors => {
    })
  }

  @action
  updateEditorState(state) {
    this.editorState = state
  }
}
