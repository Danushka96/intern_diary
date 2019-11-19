import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import VueFirestore from 'vue-firestore';
import firebase from 'firebase';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueFirestore);
Vue.use(VueClipboard);
Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            created() {
                if (firebase.auth().currentUser) {
                    this.$store.commit('login', firebase.auth().currentUser);
                } else {
                    this.$store.commit('logout');
                }
            },
            render: h => h(App),
        }).$mount('#app')
    }
})