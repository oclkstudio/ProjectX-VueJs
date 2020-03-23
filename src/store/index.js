import Vue from 'vue'
import Vuex from 'vuex'
import Codes from './modules/codes'
import Mop from './modules/mop'
import Rbs from './modules/rbs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Codes,
    Mop,
    Rbs
  }
})
