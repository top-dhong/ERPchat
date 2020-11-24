import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// App Title
		appTitle: ''
	},
	mutations: {
		// 更新 App Title
		updateAppTitle(state, appTitle) {
			state.appTitle = appTitle;
		}
	},
	actions: {}
});
export default store;