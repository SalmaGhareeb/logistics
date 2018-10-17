import Vue from 'vue';
import Router from 'vue-router';
import Shipments from '@/components/Shipments';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Shipments',
      component: Shipments,
    },
  ],
});
