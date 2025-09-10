import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
// import LoginPage from '@/views/LoginPage.vue';
import NotFound from '@/components/NotFound.vue';
import Details from '@/components/Details.vue';
// import RegisterPage from '@/views/RegisterPage.vue';

//Set the routes
const router = createRouter({
    history: createWebHistory(),
    routes: [
        //Home route
        {
            path: '/',
            component: Home,
            name: 'Home'
        },

        //Event details route
        {
            path:'/:slug',
            component: Details,
            name: 'Details',
        },

        //Login route
        // {
        //     path: '/login',
        //     component: LoginPage,
        //     name: 'Login'
        // },

        //Register route
        // {
        //     path: '/register',
        //     component: RegisterPage,
        //     name: 'Register'
        // },

        //Undefined route
        {
            path: '/:catchAll(.*)',
            component: NotFound,
            name: '404'
        }
    ]
});

export default router;