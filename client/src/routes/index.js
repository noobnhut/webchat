import {
    createRouter,
    createWebHistory
  } from 'vue-router';
  const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue')
      },  
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
      },  
    ]
  })
  export default router;