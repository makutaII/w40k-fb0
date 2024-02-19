<template>
  <v-container>
    <h1 class="ma-lg-9">Характеристики</h1>

    <v-row class="ma-4">
      <div>
        Характеристики отражают изначальный потенциал персонажа, его природные
        телесные и духовные показатели. У героев «Империума Маледиктум» десять
        характеристик, каждая из которых связана с определённым умением.
        Характеристики выражены числом от 1 до 100. Уровень обычного человека –
        30-40 очков.
      </div>
    </v-row>
    <!-- !  Характеристики -->

    <v-col>
      <v-sheet
        style="min-width: 300px"
        v-for="(char, i) in charsD"
        :key="i"
        class="ma-2"
        >{{ char.name }}
      </v-sheet>

      <!-- ?  Селект -->
      <v-row>
        <!-- v-model="value"  :items="items" -->
        <v-select
          disabled=""
          v-model="charsD"
          persistent-hint
          :hint="`${select.name}, ${select.id}`"
          :items="charsD"
          item-title="name"
          item-value="id"
          chips
          label="Характеристики"
          multiple
        >
          <template v-slot:prepend-item>
            <v-list-item title="Select All" @click="toggle">
              <template v-slot:prepend>
                <v-checkbox-btn
                  :color="likesSomeFruit ? 'indigo-darken-4' : undefined"
                  :indeterminate="likesSomeFruit && !likesAllFruit"
                  :model-value="likesSomeFruit"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
        <!-- ? ------->
      </v-row>
    </v-col>
    <v-row>
      <v-col cols="12" v-for="(char, i) in charsD">
        <h3>{{ char.name }}</h3>
         <div>{{ char.description }}</div> 
      </v-col>
    </v-row>
    <!--   карточки -->
    <v-row>
     
      <v-sheet
        style="min-width: 300px"
        v-for="(skill, i) in skillsD"
        :key="i"
        class="ma-2"
      >
        <v-card>
          <!-- ? title -->
          <!-- <nuxt-link :to="`/characteristics/${translit(skill.name)}`"> -->
          <nuxt-link
            style="text-decoration: none; color: inherit"
            :to="`/characteristics/${skill.id}`"
          >
            <v-card-title class="pt-1 pb-0">
              <p>{{ skill.id }}. {{ skill.name }}</p>
            </v-card-title>
          </nuxt-link>

          <!-- ? actions -->
          <v-card-actions style="min-height: 10px" class="pl-5 pr-0 py-0 mt-n2">
            <v-chip color="info" size="x-small" prepend-icon="mdi-brightness-7">
              <v-tooltip activator="parent" location="bottom" max-width="400">
                <p>{{ skill.char.name }}</p>
                {{ skill.char.description }}</v-tooltip
              >
              {{ skill.char.name }}
            </v-chip>
            <v-spacer></v-spacer>

            <!-- кнопка раскрытия -->

            <v-btn
              :icon="showId == skill.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              size="small"
              :id="skill.id"
              @click="greetId(skill.id)"
            ></v-btn>
          </v-card-actions>

          <!-- ? expand-transition -->

          <v-fab-transition>
            <!-- ++ открывается по клику кнопки тест: <p v-show="name==i">{{ name }}</p> -->

            <v-card-text v-show="showId == skill.id">
              <div
                v-if="skill.specs[0]"
                class="text-subtitle-2 font-weight-bold"
              >
                Специализации:
              </div>

              <!-- <v-divider class="ma-2" color="info"></v-divider> -->
              <v-row>
                <v-col v-for="(spec, i) in skill.specs">
                  <v-expansion-panels>
                    <v-expansion-panel
                      elevation="1"
                      :title="spec.name"
                      :text="spec.description"
                    >
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>

              <p class="mt-7">
                <span class="text-subtitle-2 font-weight-bold"
                  >{{ skill.name }}.<br /> </span
                >{{ skill.description }}
              </p>
            </v-card-text>
          </v-fab-transition>
        </v-card>
      </v-sheet>

      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>
<!-- ================================= -->

<script setup>
//================
const showId = ref("");

function greetId(id) {
  if (showId.value !== id) {
    showId.value = id;
  } else {
    //   console.log('id=', id, ' showId.value=', showId.value, 'true');
    showId.value = "";
  }
}

// function greet(event) {
//   let i = event.target.id;
//   showId.value = event.target.id
//   console.log('i=', i);
//   console.log('showId.value=', showId.value);
//   //return (showId.value = event.target.id);

// }

const skillsD = ref(null);
skillsD.value = await getSkills();

async function getSkills() {
  let s2 = await $fetch("/api/w_skill/char_spec", {});
  //console.log("s2=", s2);
  return s2;
}

//характеристики
const charsD = ref(null);
charsD.value = await getChars();

async function getChars() {
  return await $fetch("/api/w_characteristic");
}

//!chips

const select = ref({});

const items = [
  { name: "Florida", abbr: "FL" },
  { name: "Georgia", id: "GA" },
  { name: "Nebraska", id: "NE" },
  { name: "California", id: "CA" },
  { name: "New York", id: "NY" },
];

const selectedFruits = ref([]);

const likesAllFruit = computed(() => {
  return selectedFruits.value.length === fruits.length;
});

const likesSomeFruit = computed(() => {
  return selectedFruits.value.length > 0;
});

function toggle() {
  if (likesAllFruit.value) {
    selectedFruits.value = [];
  } else {
    selectedFruits.value = fruits.slice();
  }
}
//!----------------------
//const items = ref(["foo", "bar", "fizz", "bu"]);

//const value = ref(["foo", "bar", "fizz", "bu"]);
//const value = ref([{ names: 'foo' }, { names: "bar" }, { names: "fizz" },]);

//const itemsv = [{ names: 'foo', id: 'FL' }, { names: "bar", id: 'FL' }, { names: "fizz" , abbr: 'FL'},];

//  ch(charsD);
//  async function ch(c) {
//   let c1 = c;
//    let clone = Object.values(c);
//    console.log('clone=', clone);
// //    console.log('c.val=', items.value);
//    return c.value;

//  }
// транслит для ссылок
function translit(t) {
  const Chars = {
    " ": "_",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "YO",
    Ж: "ZH",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "CH",
    Ш: "SH",
    Щ: "SHCH",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "YU",
    Я: "YA",
  };

  for (var i in Chars) {
    t = t.replace(new RegExp(i, "g"), Chars[i]);
  }
  return t;
}
</script>

<script></script>

<style scoped></style>
