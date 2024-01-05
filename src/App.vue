<template>
  <v-app id="inspire">
    <!--Шапка-->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img width="170" inline src="./img/wh-logo.png" ></v-img>
      <v-app-bar-title>WarHammer 40. 000</v-app-bar-title>

      <!--Меню -->
        
      <v-btn
        color="primary"
        v-bind="props" target="_blank" href="https://vuetifyjs.com/en/components/all/#containment"
        >Vue.js v2
      </v-btn>

  <v-btn
            color="primary"
            v-bind="props" target="_blank" href="https://v2.vuetifyjs.com/en/components/application/#default-application-markup"
            >Vuetify v2
          </v-btn>       
  <v-btn
          color="primary"
          v-bind="props" target="_blank" href="https://ru.vuejs.org/v2/guide/index.html"
          >Vuetify v3
        </v-btn>      

      <div class="text-center">
        <v-menu
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Dropdown
            </v-btn>
          </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in menuitems"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
    </v-app-bar>  

    <!--Боковая панель-->
    <v-navigation-drawer :width="215" v-model="drawer">

      <v-list-item title="WH 40.000" subtitle="Справочник"></v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-subheader>СПРАВОЧНИК</v-list-subheader>

        <v-list-item
            v-for="(item, i) in items"
              :key="i"
              :value="item"
              :to="item.to"
              color="primary"
            >          
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>      

    </v-navigation-drawer>



    <v-main>
      <!--https://ru.vuejs.org/v2/guide/index.html  -->

            <!-- If using vue-router -->
        <router-view></router-view>
    </v-main>
  </v-app>
</template>


<!---------------------------------------------------->
<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({
    drawer: null,


    // items: [
    //   { title: 'Главная', icon: 'mdi-home-city',to:'/' },
    //   { title: 'Характеристики', icon: 'mdi-clock', to: '' },
    //   { title: 'Умения', icon: 'mdi-account', to: '' },            
    //   { title: 'Специализации', icon: 'mdi-flag', to: '' },
    //   { title: 'Оружие', icon: 'mdi-view-dashboard', to: '' },
    //   { title: 'О проекте', icon: 'mdi-format-list-checks', to: '/About' },
    // ],
    items: [
      { title: 'Главная', icon: '',to:'/' },
      { title: 'Характеристики', icon: '', to: '' },
      { title: 'Умения', icon: '', to: '' },
      { title: 'Специализации', icon: '', to: '' },
      { title: 'Оружие', icon: '', to: '' },
      { title: 'О проекте', icon: '', to: '/About' },
    ],
    
    menuitems: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>