<template>

  <v-app id="inspire">
    <v-app-bar class="pr-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <a style="margin-left: 20px" href="/">
        <v-img
          class="mylogo"
          width="45"
          inline
          src="~assets/img/Thousand-sons.svg"
        >
        </v-img>
      </a>
      <v-app-bar-title>Warhammer 40000</v-app-bar-title>

      <v-spacer></v-spacer>

      <!--*-------------верхнее меню--------------->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

        <!--++ Диалоговое окно логин-->
      <login-window/>
    
      
    </v-app-bar>

    <!--*-------------Боковая панель--------------->
    <v-navigation-drawer :width="215" v-model="drawer" mobile-breakpoint="sm">
      <NuxtLink to="/">
        <v-img
          src="~/assets/img/wh-logo.png"
          style="height: 60px"
          class="mx-lg-auto my-8"
        />
      </NuxtLink>
      <v-divider></v-divider>

      <v-list :lines="false">
        <v-list-subheader>Справочник</v-list-subheader>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          :to="item.to"
          :disabled="item.disabled"
          color="primary"
          rounded="shaped"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title
            :href="item.href"
            v-text="item.title"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--* ------------Main ------------------>
    <v-main class=" d-flex align-center justify-center" >
      <!-- <router-view></router-view> -->
   
        <slot />

    </v-main>
    
  </v-app>

</template>

<!--=============================================-->

<script setup>

import { ref } from "vue";
const drawer = ref(null);

//-----------

//Боковое меню
const items = [
  { title: "В начало", icon: "mdi-home", to: "/", disabled: false },
  { title: "Таланты", icon: "mdi-clock", to: "/talents", disabled: false },
  { title: "Характеристики", icon: "mdi-format-list-checks", to: "/characteristics", disabled: false },
  { title: "Умения", icon: "mdi-account", to: "/skills", disabled: false },
  { title: "Специализации", icon: "mdi-flag", to: "/specializations", disabled: false },
  { title: "Оружие", icon: "mdi-view-dashboard", to: "", disabled: true },
  { title: "О проекте", icon: "mdi-home-city", to: "/about" },
  { title: "user", icon: "mdi-account", to: "/user" },
    { title: "dash", icon: "mdi-account", to: "/dashboard" },
];

</script>

<script></script>

<style scoped>
.mylogo {
  /* margin-left: 20px; */
  transform: rotate(0);
  transition: transform 0.8s ease-in-out;
}
.mylogo:hover {
  transform: rotate(-540deg);
}
</style>
