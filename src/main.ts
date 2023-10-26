import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { setupRouter } from '@/router';
import { createGuard } from '@/router/guard';
import { setupStore } from '@/store';
import App from './App.vue'

const router = setupRouter();
const app = createApp(App);
setupStore(app);
createGuard(router);
app.use(Antd)
app.use(router);
app.mount('#app')
