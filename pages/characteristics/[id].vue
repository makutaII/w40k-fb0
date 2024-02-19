<template>
  <v-container>
    <v-sheet class="mb-16"
      ><h4>Умение</h4>

      <!-- <div v-for="(skill, c) in skillsD"> -->
        <h1>{{ skillsD.id }}. {{ skillsD.name }}</h1>
        <v-row class="mx-0 my-0">
        <h5 class="mt-1">Характеристика:</h5>
        <v-chip color="info" size="small" prepend-icon="mdi-brightness-7">
          <v-tooltip activator="parent" location="bottom" max-width="400">
            <p>{{ skillsD.char.name }}</p>
            {{ skillsD.char.description }}</v-tooltip
          >
          {{ skillsD.char.name }}
        </v-chip>
        </v-row >
        <v-sheet class="mt-5 pa-6" elevation="2">
          {{ skillsD.description }}
        </v-sheet>

        <div class="mt-12 mb-0 text-subtitle-2 font-weight-bold">
          Специализации:
        </div>
        <v-sheet class="ma-5 mt-2 pa-4" elevation="2" v-for="(spec, s) in skillsD.specs">
            <div class="text-subtitle-2 font-weight-bold">
          {{ spec.name }}
</div>
          {{ spec.description }}
        </v-sheet>
      <!-- </div> -->
    </v-sheet>
  </v-container>
</template>

<script setup>
const { id } = useRoute().params;

//console.log('id=',id)

//характеристики
const skillsD = ref(null);
skillsD.value = await getSkills(id);

async function getSkills(id1) {
  let cf = await $fetch("/api/w_skill/one", {
    method: "POST",
    body: {
      id: parseInt(id1),
    },
  });
  console.log("id1=", id1, "  cf=", cf);

  return cf;
}

// definePageMeta({
//     layout: 'pers'
//})
</script>
<style scoped></style>
