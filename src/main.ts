import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue'

const router = setupRouter();
const app = createApp(App);
setupStore(app);
app.use(Antd)
app.use(router);
app.mount('#app')
