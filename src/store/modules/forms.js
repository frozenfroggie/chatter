import axiosAuth from '../../config/axiosAuth'

const state = {
  signupForm: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  signupRequest: {
    pending: false,
    success: false,
    error: false,
    errorMessage: ''
  },
  loginForm: {
    username: 'Guest',
    password: 'guest123'
  },
  loginRequest: {
    pending: false,
    success: false,
    error: false,
    errorMessage: ''
  }
}

const getters = {
  signupForm: state => state.signupForm,
  signupRequest: state => state.signupRequest,
  loginForm: state => state.loginForm,
  loginRequest: state => state.loginRequest
}

const mutations = {
  updateSignupForm: (state, payload) => {
    state.signupForm[payload.name] = payload.value
  },
  updateLoginForm: (state, payload) => {
    state.loginForm[payload.name] = payload.value
  },
  requestPending: (state, payload) => {
    state[payload.requestType].success = false
    state[payload.requestType].pending = true
    state[payload.requestType].error = false
    state[payload.requestType].errorMessage = ''
  },
  requestSuccess: (state, payload) => {
    state[payload.requestType].success = true
    state[payload.requestType].pending = false
    state[payload.requestType].error = false
    state[payload.requestType].errorMessage = ''
  },
  requestError: (state, payload) => {
    state[payload.requestType].success = false
    state[payload.requestType].pending = false
    state[payload.requestType].error = true
    state[payload.requestType].errorMessage = payload.errorMessage
  }
}

const actions = {
  updateLoginForm: ({commit}, payload) => {
    commit('updateLoginForm', payload)
  },
  updateSignupForm: ({commit}, payload) => {
    commit('updateSignupForm', payload)
  },
  signup: ({commit, state}) => {
    commit('requestPending', {requestType: 'signupRequest'})
    axiosAuth.post('/user/signup', state.signupForm)
      .then(res => {
        commit('requestSuccess', {requestType: 'signupRequest'})
        commit('emailSend')
      })
      .catch(() => {
        commit('requestError', {requestType: 'signupRequest', errorMessage: 'Invalid credentials'})
      })
  },
  login: ({commit, state}) => {
    commit('requestPending', {requestType: 'loginRequest'})
    axiosAuth.post('/user/login', state.loginForm)
      .then(res => {
        const accessToken = res.headers.authorization.split(' ')[1]
        sessionStorage.setItem('accessToken', accessToken)

        const refreshToken = res.data.refreshToken
        localStorage.setItem('refreshToken', refreshToken)
        commit('authorize', res.data.user)
        commit('requestSuccess', {requestType: 'loginRequest'})
      })
      .catch(err => {
        if (err.response.data.type === 'invalid-password') {
          commit('requestError', {requestType: 'loginRequest', errorMessage: 'Invalid credentials'})
        } else if (err.response.data.type === 'no-user-found') {
          commit('requestError', {requestType: 'loginRequest', errorMessage: 'User not exists'})
        } else if (err.response.data.type === 'not-verified') {
          commit('requestError', {requestType: 'loginRequest', errorMessage: 'Please confirm your email address first'})
        } else {
          commit('requestError', {requestType: 'loginRequest', errorMessage: 'Something goes wrong, try again later'})
        }
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
