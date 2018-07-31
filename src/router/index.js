import Vue from 'vue'
import Router from 'vue-router'
import AppConversations from '../components/AppConversations'
import AppChat from '../components/AppChat'
import AppFriends from '../components/AppFriends'
import AppAddFriends from '../components/AppAddFriends'
import AppSettings from '../components/AppSettings'
import AppLogin from '../components/AppLogin'
import AppSignup from '../components/AppSignup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: AppConversations,
        login: AppLogin
      }
    },
    {
      path: '/signup',
      components: {
        signup: AppSignup
      }
    },
    {
      path: '/chat/:conversationId',
      name: 'chat',
      components: {
        default: AppConversations,
        chat: AppChat,
        login: AppLogin
      }
    },
    {
      path: '/friends',
      component: AppFriends
    },
    {
      path: '/friends/add',
      component: AppAddFriends
    },
    {
      path: '/settings',
      component: AppSettings
    }
  ]
})
