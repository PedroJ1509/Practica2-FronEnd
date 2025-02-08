import Vue from 'nativescript-vue'
import Vuex from "vuex";

Vue.use(Vuex); // Habilita Vuex

export default new Vuex.Store({
    state: {
      user: null, // <-- Asegúrate de tener este estado
      products: [],
      tokenFirebase: ""
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user
      },
      SET_TOKENFIREBASE(state, tokenFirebase) {
        state.tokenFirebase = tokenFirebase
      }
    }
  })