const state = {
  shouldShowPrompt: false,
  shouldShowCalling: false,
  isStarted: false,
  hangup: false
}

const getters = {
  videoChatShowPrompt: state => state.shouldShowPrompt,
  videoChatShowCalling: state => state.shouldShowCalling,
  isVideoChatStarted: state => state.isStarted,
  isVideoChatHangup: state => state.hangup
}

const mutations = {
  showVideoChatPrompt: (state) => {
    state.shouldShowPrompt = true
    state.hangup = false
  },
  showVideoChatCalling: (state) => {
    state.shouldShowCalling = true
    state.hangup = false
  },
  videoChatStart: (state) => {
    state.shouldShowPrompt = false
    state.shouldShowCalling = false
    state.isStarted = true
    state.hangup = false
  },
  videoChatHangup: (state) => {
    state.shouldShowPrompt = false
    state.shouldShowCalling = false
    state.isStarted = false
    state.hangup = true
  }
}

const actions = {
  showVideoChatPrompt: ({commit}) => {
    commit('showVideoChatPrompt')
  },
  showVideoChatCalling: ({commit}) => {
    commit('showVideoChatCalling')
  },
  videoChatStart: ({commit}) => {
    commit('videoChatStart')
  },
  videoChatHangup: ({commit}) => {
    commit('videoChatHangup')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
