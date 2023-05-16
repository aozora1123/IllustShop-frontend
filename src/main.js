import { createApp } from 'vue'
//import App from './App.vue'
import router from './router'
import HomePage from './components/HomePage.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

createApp(HomePage).use(router).mount('#app')

