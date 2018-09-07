const state = {
  isDragged: false,
  resizerPositionX: null,
  resizerTurned: false
}

const getters = {
  resizerPositionX: state => state.resizerPositionX,
  resizerTurned: state => state.resizerTurned
}

const mutations = {
  toogleIsDragged: (state) => {
    state.isDragged = !state.isDragged
  },
  changeResizerPosition: (state, payload) => {
    if (payload < 400) {
      state.resizerPositionX = 400
    } else if (payload > 750) {
      state.resizerPositionX = 750
    } else {
      state.resizerPositionX = payload
    }
  },
  toogleResizerTurned: (state) => {
    state.resizerPositionX = null
    state.resizerTurned = !state.resizerTurned
  }
}

const actions = {
  handleMouseDown: ({commit, state}, payload) => {
    if (!state.isDragged) {
      commit('toogleIsDragged')
      document.body.style.cursor = 'e-resize'
    }
  },
  handleMouseUp: ({commit, state}, payload) => {
    if (state.isDragged) {
      commit('toogleIsDragged')
      document.body.style.cursor = 'auto'
    }
  },
  handleMouseMove: ({commit, state}, payload) => {
    state.isDragged && commit('changeResizerPosition', payload.clientX)
  },
  turnOnResizer: ({commit, state}, payload) => {
    !state.resizerTurned && commit('toogleResizerTurned')
  },
  turnOffResizer: ({commit, state}, payload) => {
    state.resizerTurned && commit('toogleResizerTurned')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
