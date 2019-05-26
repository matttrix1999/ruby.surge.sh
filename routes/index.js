import AppPage from 'components/app'
import __404__ from 'components/404'
import LoginPage from 'components/pages/login'
import TopicsPage from 'components/pages/topics'
import ExplorePage from 'components/pages/explore'
import UsersShowPage from 'components/pages/users/show'
import TopicsShowPage from 'components/pages/topics/show'
import UsersShowRepliesPage from 'components/pages/users/show/replies'
import UsersShowFollowersPage from 'components/pages/users/show/followers'
import UsersShowFollowingPage from 'components/pages/users/show/following'
import UsersShowFavoritesPage from 'components/pages/users/show/favorites'

export default [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/logout',
    onEnter: (nextState, replace) => {
      localStorage.removeItem('access_token')
      replace('/')
    }
  },
  {
    path: '/',
    component: AppPage,
    indexRoute: {
      onEnter: (nextState, replace) => replace('/topics')
    },
    childRoutes: [
      {
        path: '/topics',
        component: TopicsPage
      },
      {
        path: '/topics/:id',
        component: TopicsShowPage
      },
      {
        path: '/users',
        onEnter: (nextState, replace) => replace('/explore')
      },
      {
        path: '/explore',
        component: ExplorePage
      },
      {
        path: '/:login',
        component: UsersShowPage
      },
      {
        path: '/:login/replies',
        component: UsersShowRepliesPage
      },
      {
        path: '/:login/followers',
        component: UsersShowFollowersPage
      },
      {
        path: '/:login/following',
        component: UsersShowFollowingPage
      },
      {
        path: '/:login/favorites',
        component: UsersShowFavoritesPage
      }
    ]
  },
  {
    path: '*',
    component: __404__
  }
]
