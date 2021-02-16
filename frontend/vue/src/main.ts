import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { ActionsType } from './store/actions.type';

// router.beforeEach((to, from, next) =>
//   Promise.all([store.dispatch(ActionsType.CHECK_AUTH)]).then(next)
// );

createApp(App).use(store).use(router).mount('#app')
