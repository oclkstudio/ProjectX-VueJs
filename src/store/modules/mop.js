import axios from 'axios'

const state = {
    result: null,
}

const getters = {
    result: state => state.result
}

const actions = {
    async getResult({ commit }, item) {
        const response = await axios.get('http://localhost:8088/jms/mop', {
            params: {
                subscriptionId: item.subscriptionId,
                requestId: item.id
            }
        })
        commit('GET_RESULT', response.data)
    }
}

const mutations = {
    GET_RESULT: (state, response) => (state.result = response)
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}