import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: null,
        currentDate: null,
    },
    mutations: {
        login(state, user) {
            state.currentUser = user;
        },
        logout(state) {
            state.currentUser = null;
        },
        setCurrentDate(state, date) {
            state.currentDate = date;
        }
    },
    actions: {},
    modules: {}
})