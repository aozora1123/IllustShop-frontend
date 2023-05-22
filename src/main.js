import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import IndexPage from './components/IndexPage.vue'
//import ProductPage from './components/ProductPage.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

createApp(App).use(router).mount('#app')
//createApp(IndexPage).use(router).mount('#app')
//createApp(ProductPage).use(router).mount('#app')

