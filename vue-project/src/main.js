// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import router from './routes'
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import 'bootstrap-icons/font/bootstrap-icons.css';


createApp(App).use(router).use(BootstrapIconsPlugin).use(bootstrap).mount('#app')
