import axios from 'axios'

const state = {
    subscriptions: [],
}

const getters = {
    subscriptions: state => state.subscriptions,
}

const actions = {
    async getSubscriptionsByCode({ commit }, projectCode) {
        const response = await axios.get('http://localhost:8088/jms/rbs', {
            params: {
                projectCode: projectCode,
            }
        })
        var arrObj = response.data.subscriptionId.map(function (value, i) {
            return {
                id: i.toString(),
                subscriptionId: value,
            };
        })
        commit('GET_SUBSCRIPTIONS_BY_CODE', arrObj)
    },
    resetSubscriptions({ commit }) {
        commit('RESET_SUBSCRIPTIONS')
    }
}

const mutations = {
    GET_SUBSCRIPTIONS_BY_CODE(state, subscriptions) {
        state.subscriptions = null;
        state.subscriptions = subscriptions;
    },
    RESET_SUBSCRIPTIONS: (state) => (state.subscriptions = null),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}