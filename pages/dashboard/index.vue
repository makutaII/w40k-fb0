<template>
  <v-container>
    <h1 class="ma-lg-9">Дашборд</h1>
    
      <dashboard-tab-talents/>
    <!--! <v-card>
     
      <v-tabs v-model="tab" color="primary" align-tabs="center">
        <v-tab :value="one">Один</v-tab>
        <v-tab :value="two">Два</v-tab>
        <v-tab :value="three">Три</v-tab>
      </v-tabs>
 
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
          
          </v-window-item>

          <v-window-item value="two"> Two </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card> -->
  </v-container>
</template>

<script setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const tab = ref(0);

//!получаем данные
// const talentsD = ref(null);
// //const requirementsD =ref(null)
// talentsD.value = await getTalents();
// //requirementsD.value = await getrequirements()
// //console.log(talentsD.value)
// async function getTalents() {
//   return await $fetch("/api/w_talent");
// }

//!если юзер не вошел, то на главную
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/");
    //если юзер не админ, то на главную
  } else if (user.value.role != "admin") {
    return navigateTo("/");
  }
});
</script>

<style scoped></style>
