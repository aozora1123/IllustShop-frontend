import { createApp } from 'vue'
import VueLazyload from 'vue-lazyload';
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

//createApp(App).use(router).mount('#app')
const app = createApp(App);
app.use(router);
app.use(VueLazyload, {
    preLoad: 1.2, // 預加載高度的比例
    error: require('./assets/error.png'), // 加載失敗時顯示的圖片
    loading: require('./assets/loading.gif'), // 加載中顯示的圖片
    attempt: 3 // 加載失敗時的重試次數
  });
app.mount('#app');

