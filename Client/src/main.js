
import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';

//Import the router to use the routes
import router from './router';

//Import the google login
import vue3GoogleLogin from 'vue3-google-login';

//Get the clientId set in config.js (You will need to create a file with clientId='YOUR_GOOGLE_CLIENT_ID')
import { clientId } from './config';

//Build the app
const app = createApp(App)

//Tell the app what to use
app.use(router);
app.use(vue3GoogleLogin, {
    clientId: clientId
})

//WIll mount the app => make your app work
app.mount("#app");