<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">

        <v-img :src="require('../img/IM-Logo-Banner.png')" class="my-3" contain height="150" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Warhammer 40 000 Hanbook
        </h1>
        <h2 class="display-2 font-weight-bold mb-3">
          На содержание не смотрим - это рыба <br>
          v0.0003alpha
        </h2>
        <p>Сверху документация на фреймворки.
          Слева возможное исполнение навигации по справочнику</p>
        <br>
        <h4>зеркала:</h4>
        <a target="_blank" href="https://wh40000.web.app/">
          <h4>firebase</h4>
        </a>
        <a target="_blank" href="https://wh40000.firebaseapp.com">
          <h4>firebase 2</h4>
        </a>

        <a target="_blank" href="https://wh40000.netlify.app/">
          <h4>netlify</h4>
        </a>

        <br>
        <h4>ссылки на проект </h4>
        <a target="_blank" href="https://github.com/makutaII/w40k-fb0">
          <p> гитхаб (репозиторий)</p>
        </a>
        <a target="_blank" href="    https://console.firebase.google.com/u/1/project/wh40k-s2/overview
                    ">
          <h4>firebase console</h4>
        </a>
        <a target="_blank" href="https://app.netlify.com/sites/wh40000/overview">
          <h4>netlify console</h4>
        </a>

      </v-col>
      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <h2 class="headline font-weight-bold mb-5">
            Important Links
          </h2>
        </v-row>
        <v-row justify="center">
          <a v-for="(link, i) in importantLinks" :key="i" :href="link.href" class="subheading mx-3" target="_blank">
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'HelloWorld',

  data: () => ({
    importantLinks: [
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
  }),
}
</script>