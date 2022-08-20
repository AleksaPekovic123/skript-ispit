import Home from './components/pages/Home.vue';
import SignUp from './components/pages/SignUp.vue';
import Login from './components/pages/Login.vue';
import Movies from './components/pages/Movies.vue';
import Books from './components/pages/Books.vue';
import Entity from './components/pages/Entity.vue';
import Songs from './components/pages/Songs.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'Home',
    component: Home,
    path: '/',
  },
  {
    name: 'SignUp',
    component: SignUp,
    path: '/signup',
  },
  {
    name: 'Login',
    component: Login,
    path: '/login',
  },
  {
    name: 'Movies',
    component: Movies,
    path: '/movies',
  },
  {
    name: 'Books',
    component: Books,
    path: '/books',
  },
  {
    name: 'Songs',
    component: Songs,
    path: '/songs',
  },
  {
    name: 'Entity',
    component: Entity,
    path: '/entity',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
