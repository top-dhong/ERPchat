import Vue from 'vue'
import App from './App'
import HMmessages from '@/components/HM-messages/HM-messages.vue';
Vue.component('HMmessages',HMmessages)
Vue.prototype.HMmessages = HMmessages;

Vue.config.productionTip = false

import eRoutes from '@/common/js/eRoutes.js';
Vue.prototype.RP = eRoutes;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
