import { createApp,h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';
import '@/assets/styles/common.less';

let app=createApp({
    render(){
        return h(App);
    }
}).use(store).use(router);
app.mount('#app')

app.config.globalProperties.author="jjcc";