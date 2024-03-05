import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import subscriberStore from './store/subscribers';
import blogStore from './store/blogs';
import SubscriberList from './components/pages/SubscriberList';
import SubscriberCreate from './components/pages/SubscriberCreate';
import SubscriberView from './components/pages/SubscriberView';
import SubscriberEdit from './components/pages/SubscriberEdit';
import BlogList from './components/pages/BlogList';
import BlogCreate from './components/pages/BlogCreate';
import BlogView from './components/pages/BlogView';
import BlogEdit from './components/pages/BlogEdit';
import NavigationBar from './components/NavigationBar.vue';


axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
  return config;
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: DashboardPage },
    { path: '/subscribers', component: SubscriberList },
    { path: '/subscribers/create', name: 'SubscriberCreate', component: SubscriberCreate },
    { path: '/subscribers/:id/edit', name: 'SubscriberEdit', component: SubscriberEdit },
    { path: '/subscribers/:id/view', name: 'SubscriberView', component: SubscriberView },
    { path: '/blogs', name: 'BlogList', component: BlogList },
    { path: '/blogs/:id/edit', name: 'BlogEdit', component: BlogEdit }, // Add the route for BlogEdit with ':id' parameter
    { path: '/blogs/create', name: 'BlogCreate', component: BlogCreate },
    { path: '/blogs/:id', name: 'BlogView', component: BlogView },
  ],
});

createApp(App)
  .use(router)
  .use(subscriberStore)
  .use(blogStore)
  .component('NavigationBar', NavigationBar)
  .mount('#app');
