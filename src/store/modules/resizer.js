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
    // console.log(payload)
    if (payload < 350) {
      state.resizerPositionX = 350
    } else if (payload > (window.innerWidth * 0.7)) {
      state.resizerPositionX = window.innerWidth * 0.7
    } else if (payload < (window.innerWidth * 0.3)) {
      state.resizerPositionX = window.innerWidth * 0.3
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
  manualChangeResizerPosition: ({commit, state}, payload) => {
    commit('changeResizerPosition', payload)
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
