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
    <h3  class = "ma-lg-9">Control</h3>
        <div class="mb-16">
            <!-- <div v-for="t in talentsD">
                <NuxtLink :to="`/talents/${translit(t.name)}`">{{ translit(t.name) }} : {{ t.id }} {{ t.name }}</NuxtLink>
            </div> -->

        </div> 
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


// function translit(t) {
// 		const Chars = {
//       ' ':'_','а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'
// 		}
		
// 		for (var i in Chars) { t = t.replace(new RegExp(i, 'g'), Chars[i]); }
// 		return t;
// 	};

//console.log(st);





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
