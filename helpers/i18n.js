import * as zh_CN from 'locales/zh_CN'

export function translate(value, locale = 'zh_CN') {
  return ({ zh_CN })[locale][value]
}

export default { t: translate }
