import { createStore } from 'vuex';
import home from './home.module';
import auth from './auth.module';
import song from './song.module';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    song,
    auth
  }
})
