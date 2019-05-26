import oauth2 from 'simple-oauth2'
import leanengine from 'leanengine'

const { RC_CLIENT_ID, RC_CLIENT_SECRET } = process.env
const { LEANCLOUD_APP_ID, LEANCLOUD_APP_KEY, LEANCLOUD_APP_MASTER_KEY } = process.env

export function createOAuth2() {
  return oauth2.create({
    client: {
      id: RC_CLIENT_ID,
      secret: RC_CLIENT_SECRET
    },
    auth: {
      tokenHost: 'https://ruby-china.org'
    }
  })
}

if (LEANCLOUD_APP_ID) {
  leanengine.init({
    appId: LEANCLOUD_APP_ID,
    appKey: LEANCLOUD_APP_KEY,
    masterKey: LEANCLOUD_APP_MASTER_KEY
  })
}

export default leanengine
