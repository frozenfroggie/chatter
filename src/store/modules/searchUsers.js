import axiosAuth from '../../config/axiosAuth'

const state = {
  pending: false,
  users: null,
  error: false
}

const getters = {
  users: state => state.users
}

const mutations = {
  searchUsersPending: (state) => {
    state.pending = true
  },
  searchUsersSuccess: (state, payload) => {
    state.users = payload
    state.pending = false
  },
  searchUsersError: (state, payload) => {
    state.error = payload
    state.pending = false
  }
}

const actions = {
  searchUsers: ({commit}, payload) => {
    commit('searchUsersPending')
    const searchPhrase = payload.trim()
    axiosAuth.get(`/user/find/${searchPhrase}`)
      .then(res => {
        commit('searchUsersSuccess', res.data.users)
      })
      .catch(err => {
        commit('searchUsersError', err)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
