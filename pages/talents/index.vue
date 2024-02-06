<template>
  <v-container>
    <h1 class="ma-lg-9">Таланты</h1>
    <v-row>
      <div>
        Таланты отражают собственные уникальные способности, причуды и хитрые
        трюки
      </div></v-row
    >

    <v-row>
      <v-col v-for="(talent, i) in talentsD" :key="i">
        <v-expansion-panels>
          <v-expansion-panel>
            <!-- class="bg-surface-variant" -->
            <v-expansion-panel-title class="pa-2">
              <v-col cols="9" class="text-capitalize" style="min-width: 210px">
                {{ talent.name }}
              </v-col>

              <v-divider
                :thickness="20"
                class="border-opacity-0"
                vertical
              ></v-divider>
              <!-- <v-btn disabled="" size="23" icon="mdi-account" :to="`/talents/${talent.id}`"> -->

              <!-- </v-btn> -->
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <div
                v-if="talent.requirements[0]"
                class="text-subtitle-2 font-weight-bold mt-4"
              >
                Требования:
              </div>

              <div
                class="text-subtitle-2"
                v-for="(req, i) in talent.requirements"
              >
                {{ req.name }}
              </div>
              <v-divider class="mb-3"></v-divider>
              <p class="mb-5">
                {{ talent.description }}
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- ================================= -->
    <!-- <h3  class = "ma-lg-9">Control</h3>
        <div class="mb-16">
            <div v-for="t in talentsD">
                <NuxtLink :to="`/talents/${t.id}`">{{ t.title }}</NuxtLink>
            </div>

        </div> -->
  </v-container>
</template>
<!-- ================================= -->

<script setup>
//================
//получаем данные

//рабочий вариант для локалки
const talentsD = ref(null);
talentsD.value = await getTalents();
//console.log(talentsD.value)
async function getTalents() {
  return await $fetch("/api/w_talent");
}

//----  другой шаблон страницы
// definePageMeta({
//     layout: 'prods'
// })
//----------

//----------- данные из примера
// const { data: talentsD } =
//     // await useFetch('../db/talents.json', { // чтение из файла из паблик-папки
//     await useFetch('https://fakestoreapi.com/products', {

//     })
// ------------------------------

//import { ref } from 'vue'
</script>
<script>
export default {
  data: () => ({}),
};
</script>

<style scoped></style>
