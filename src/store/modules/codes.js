import axios from 'axios'

const state = {
    codes: [],
    code: Object
}

const getters = {
    codes: state => state.codes,
    code: state => state.code
}

const actions = {
    async getCodes({ commit }) {
        const response = await axios.get('http://localhost:8088/tt-project/all')
        commit('GET_CODES', response.data)
    },
}

const mutations = {
    GET_CODES: (state, codes) => (state.codes = codes),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}