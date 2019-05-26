import { action, observable } from 'mobx'

export default class SettingStore {
  @observable isMobile = !! Bowser.mobile
}
