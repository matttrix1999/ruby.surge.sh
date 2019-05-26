export function getToken() {
  return localStorage.getItem('access_token') || localStorage.getItem('refresh_token')
}
