import axiosAuth from '../../config/axiosAuth'

const state = {
  signupForm: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  loginForm: {
    username: '',
    password: ''
  }
}

const getters = {
  signupForm: state => state.signupForm,
  loginForm: state => state.loginForm
}

const mutations = {
  updateSignupForm: (state, payload) => {
    state.signupForm[payload.name] = payload.value
  },
  updateLoginForm: (state, payload) => {
    state.loginForm[payload.name] = payload.value
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
    axiosAuth.post('/user/signup', state.signupForm)
      .then(res => {
        commit('emailSend')
      })
      .catch(err => {
        console.log('err', err)
      })
  },
  login: ({commit, state}) => {
    axiosAuth.post('/user/login', state.loginForm)
      .then(res => {
        const accessToken = res.headers.authorization.split(' ')[1]
        sessionStorage.setItem('accessToken', accessToken)

        const refreshToken = res.data.refreshToken
        localStorage.setItem('refreshToken', refreshToken)
        commit('authorize', res.data.user)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
