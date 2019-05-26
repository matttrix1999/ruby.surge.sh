import { action, computed, observable } from 'mobx'
import { getToken } from 'helpers/auth'
import { apiUrl } from 'constants/api'

export class Category {
  @observable id
  @observable name
  @observable summary
  @observable parentId
  @observable parentName
  @observable topicsCount
  @observable createdAt
  @observable updatedAt

  constructor(args = {}) {
    this.id = args.id
    this.name = args.name
    this.summary = args.summary
    this.parentId = args.section_id
    this.parentName = args.section_name
    this.topicsCount = args.topics_count || 0
    this.createdAt = args.created_at
    this.updatedAt = args.updated_at
  }
}

export default class CategoryStore {
  @observable categories = []
  @observable targetCategory = new Category()
  @observable getCategoriesState = 'prepare'

  @computed
  get popularCategories() {
    return this.categories.filter(item => {
      return item.topicsCount > 256
    })
  }

  @action
  getCategories(args = {}, next) {
    this.getCategoriesState = 'pending'
    client.get(`${apiUrl}/nodes`).query({}).then(response => {
      const { nodes } = response.body
      this.categories = nodes.map(item => new Category(item))
      this.getCategoriesState = 'success'
    }).catch(errors => {
      this.getCategoriesState = 'failure'
    })
  }

  @action
  getTargetCategory(args = {}, next) {
    client.get(`${apiUrl}/nodes/${args.id}`).then(response => {
      const { node } = response.body
      this.targetCategory = new Category(node)
    }).catch(errors => {
    })
  }
}
