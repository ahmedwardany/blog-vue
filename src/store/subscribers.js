import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    subscribers: [],
  },
  mutations: {
    SET_SUBSCRIBERS(state, subscribers) {
      state.subscribers = subscribers;
    },
  },
  actions: {
    async fetchSubscribers({ commit }) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/subscribers', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        commit('SET_SUBSCRIBERS', response.data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    },
  },
  getters: {
    subscribers: state => state.subscribers,
  },
});

export default store;
