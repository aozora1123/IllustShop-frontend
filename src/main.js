import { createApp } from 'vue'
//import App from './App.vue'
import router from './router'
import IndexPage from './components/IndexPage.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

createApp(IndexPage).use(router).mount('#app')

