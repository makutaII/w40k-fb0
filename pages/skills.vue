<template>
  <v-container>
    <h1 class="ma-lg-9">Умения</h1>
    <v-row>
      <div>
        Умения показывают подготовку и практический опыт персонажа (например,
        лазать, стрелять или знать то, что знать не положено). Каждое умение
        связано с характеристикой, указанной в его описании.
      </div></v-row
    >
    <v-row>
      <v-col cols="11" > </v-col>
      <v-col v-for="(skill, i) in skillsD" :key="i">
        <v-expansion-panels>
          <v-expansion-panel>
            <!-- class="bg-surface-variant" -->
            <v-expansion-panel-title class="pa-2">
              <v-col  style="min-width: 250px">
                {{ skill.id }}. {{ skill.name }}
                <div>
                  <v-chip
                    @click=""
                    class="mt-2"
                    color="secondary"
                    size="small"
                    prepend-icon="mdi-brightness-7"
                  >
                    <v-tooltip
                      activator="parent"
                      location="bottom"
                      max-width="400"
                    >
                      <p>{{ skill.char.name }}</p>
                      {{ skill.char.description }}</v-tooltip
                    >
                    {{ skill.char.name }}
                  </v-chip>
                </div>
              </v-col>

              <v-divider
                :thickness="20"
                class="border-opacity-0"
                vertical
              ></v-divider>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <div
                v-if="skill.specs[0]"
                class="text-subtitle-2 font-weight-bold mt-4"
              >
                Специализации:
              </div>

              <div class="text-subtitle-2" v-for="(spec, i) in skill.specs">
                {{ spec.name }}
              </div>

              <v-divider class="mb-3"></v-divider>
              <p class="mb-5">
                {{ skill.description }}
              </p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- ================================= -->

<script setup>
//================
//получаем данные

const skillsD = ref(null);
skillsD.value = await getSkills();

async function getSkills() {
  let s2 = await $fetch("/api/w_skill/char_spec", {});
  console.log("s2=", s2);
  return s2;
}

// const barD = ref(null);
// barD.value = await barSkills(3);

// async function barSkills(id) {
//   return await $fetch("/api/w_skill/bar", {
//     method: "POST",

//     body: {
//       id: id,
//     },
//   });
// }
</script>
<script>
export default {
  data: () => ({}),
};
</script>

<style scoped></style>
