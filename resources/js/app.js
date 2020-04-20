import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './components/App';
import Home from './pages/Home';
import Hello from './pages/Hello';
import UsersIndex from './pages/UsersIndex';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello,
        },
        {
            path: '/users',
            name: 'users.index',
            component: UsersIndex,
        }
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
