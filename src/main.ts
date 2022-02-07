import { createApp } from 'vue'
import App from './App.vue'
import { registerBaseComponents } from './components/base';

const app = createApp(App)

import router from './main-router'
app.use(router);

registerBaseComponents(app);

app.mount('#app')
