import axiosAuth from '../../config/axiosAuth'

const getDefaultState = () => ({
  authenticated: false,
  user: {
    username: null,
    email: null,
    friends: []
  }
})

const state = getDefaultState()

const getters = {
  user: state => state.user,
  authenticated: state => state.authenticated
}

const mutations = {
  authorize: (state, payload) => {
    state.authenticated = true
    state.user = payload
  },
  logout: (state) => {
    Object.assign(state, getDefaultState())
  },
  addFriendSuccess: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  addFriend: ({commit}, payload) => {
    axiosAuth.patch('/user/friend/add', {user: payload})
      .then(res => {
        commit('addFriendSuccess', res.data.user)
      })
      .catch(() => {
        // console.log(err)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
