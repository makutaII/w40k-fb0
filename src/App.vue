<template>
  <v-app id="inspire">
    <v-app-bar>
        <template v-slot:image>
          <v-img
            src="./img/wh-logo.png"
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
        </template>
        
        <v-app-bar-nav-icon @click="drawer = !drawer">
        </v-app-bar-nav-icon>

        <!-- <v-img 
          width="170" inline src="./img/wh-logo.png" >
        </v-img> -->

        <v-app-bar-title>WarHammer 40 000</v-app-bar-title>

        <v-spacer></v-spacer>
 
        <v-btn
          target="_blank" href="https://vuetifyjs.com/en/components/all/#containment"
          >Vue v2
        </v-btn>

        <v-btn
          target="_blank" href="https://v2.vuetifyjs.com/en/components/application/#default-application-markup"
          >Vuetify v2
        </v-btn>       

        <v-btn
          target="_blank" href="https://ru.vuejs.org/v2/guide/index.html"
          >Vuetify v3
        </v-btn>      
        
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <!--Меню -->     
        <v-menu>

          <template v-slot:activator="{ props }">
            <v-btn 
              icon 
              v-bind="props"
              >
              <v-icon>mdi-dots-vertical</v-icon>
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

    </v-app-bar>

    <!--Боковая панель-->
    <v-navigation-drawer 
      :width="215" 
      v-model="drawer"
      mobile-breakpoint="sm"
      >

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
    // Иконки вкл , а также в src/plugins/vuetify.js включить:
    //import '@mdi/font/css/materialdesignicons.css'
    items: [
      { title: 'Главная', icon: 'mdi-home-city',to:'/' },
      { title: 'Характеристики', icon: 'mdi-clock', to: '' },
      { title: 'Умения', icon: 'mdi-account', to: '/skill' },            
      { title: 'Специализации', icon: 'mdi-flag', to: '' },
      { title: 'Оружие', icon: 'mdi-view-dashboard', to: '' },
      { title: 'О проекте', icon: 'mdi-format-list-checks', to: '/About' },
    ],
    // items: [
    //   { title: 'Главная', icon: '',to:'/' },
    //   { title: 'Характеристики', icon: '', to: '' },
    //   { title: 'Умения', icon: '', to: '' },
    //   { title: 'Специализации', icon: '', to: '' },
    //   { title: 'Оружие', icon: '', to: '' },
    //   { title: 'О проекте', icon: '', to: '/About' },

    // ],
    menuitems: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>