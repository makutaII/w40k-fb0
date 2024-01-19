<template>
    <v-app id="inspire">
        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <a style="margin-left: 20px;" href="/">
                <v-img class="mylogo" width="45" inline src="~assets/img/Thousand-sons.svg">
                </v-img>
            </a>
            <v-app-bar-title>Warhammer 40000</v-app-bar-title>

            <v-spacer></v-spacer>

            <!---------------верхнее меню--------------->
            <v-btn target="_blank" href="https://vuetifyjs.com/en/components/all/#containment">Vue v2
            </v-btn>

            <v-btn target="_blank"
                href="https://v2.vuetifyjs.com/en/components/application/#default-application-markup">Vuetify
                v2
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

        </v-app-bar>

        <!---------------Боковая панель--------------->
        <v-navigation-drawer :width="215" v-model="drawer" mobile-breakpoint="sm">

            <NuxtLink to="/">
                <v-img src="~/assets/img/wh-logo.png" style="height: 60px" class="mx-lg-auto my-8" />
            </NuxtLink>
            <v-divider></v-divider>

            <v-list :lines="false">

                <v-list-subheader to="/">СПРАВОЧНИК</v-list-subheader>


                <v-list-item v-for="(item, i) in items" 
                    :key="i" 
                    :value="item" 
                    :to="item.to"
                    color="primary" 
                    rounded="shaped" 
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.title"></v-list-item-title>

                </v-list-item>

            </v-list>

        </v-navigation-drawer>

        <!-- ------------Main ------------------>
         <v-main class="d-flex align-center justify-center" >
            <!-- <router-view></router-view> -->
            <div>
                <slot />
            </div>
        </v-main>

    </v-app>
</template>

<!--=============================================-->
<script setup>
import { ref } from 'vue'
const drawer = ref(null)
const items = [
                { title: 'В начало', icon: 'mdi-home', to: '/' },
                { title: 'Таланты', icon: 'mdi-clock', to: '/talents' },
                { title: 'Характеристики', icon: 'mdi-format-list-checks', to: '' },
                { title: 'Умения', icon: 'mdi-account', to: '' },
                { title: 'Специализации', icon: 'mdi-flag', to: '' },
                { title: 'Оружие', icon: 'mdi-view-dashboard', to: '' },
                { title: 'Тест', icon: 'mdi-account', to: '' },
                { title: 'О проекте', icon: 'mdi-home-city', to: '/about' },


]

</script>

<script>
// export default {
//     data: () => ({ 
//         items: [
//             { title: 'В начало', icon: 'mdi-home', to: '/' },
//             { title: 'Таланты', icon: 'mdi-clock', to: '/talents' },
//             { title: 'Характеристики', icon: 'mdi-format-list-checks', to: '' },
//             { title: 'Умения', icon: 'mdi-account', to: '' },
//             { title: 'Специализации', icon: 'mdi-flag', to: '' },
//             { title: 'Оружие', icon: 'mdi-view-dashboard', to: '' },
//             { title: 'Тест', icon: 'mdi-account', to: '' },
//             { title: 'О проекте', icon: 'mdi-home-city', to: '/about' },
//         ],
//     }),
// }
</script>

<style scoped>
.mylogo {
    /* margin-left: 20px; */
    transform: rotate(0);
    transition: transform .8s ease-in-out
}

.mylogo:hover {
    transform: rotate(-540deg)
}
</style>