import { createApp } from 'vue'
import { VueFire, VueFireFirestoreOptionsAPI } from "vuefire";
import { firebaseApp } from "./firebase";
//загрузка аналитики из файла
import { getAnalytics } from "./firebase";


//import "./style.css";
import App from './App.vue'

import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


loadFonts()

//создается проектом
// createApp(App)
//   .use(router)
//   .use(store)
//   .use(vuetify)
//   .mount("#app");

//из бд проекта
const app = createApp(App);
app
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireFirestoreOptionsAPI()],
  })
  .use(router)
  .use(store)
  .use(vuetify);

app.mount("#app");

  