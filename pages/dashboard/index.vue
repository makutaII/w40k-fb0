<template>
  <v-container>
    <h1 class="ma-lg-9">Дашборд</h1>
    <v-card>
    <v-tabs
      v-model="tab"
      
      color="primary"
      align-tabs="center"
    >
      <v-tab :value="one">Один</v-tab>
      <v-tab :value="two">Два</v-tab>
      <v-tab :value="three">Три</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
         <!--! Окно первое -->
         <v-container>
         <v-row>
            <v-col>
         One
                    <v-col v-for="(talent, i) in talentsD" :key="i">
                <v-expansion-panels>

                    <v-expansion-panel >
                        <!-- class="bg-surface-variant" -->
                        <v-expansion-panel-title class="pa-2">
                            <v-col cols="9" class="text-capitalize" style="min-width: 210px;">
                                {{ talent.name }}

                            </v-col>

                            <v-divider :thickness="20" class="border-opacity-0" vertical></v-divider>
                            <!-- <v-btn disabled="" size="23" icon="mdi-account" :to="`/talents/${talent.id}`"> -->

                            <!-- </v-btn> -->
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>

                            <div v-if="talent.requirements[0]" class="text-subtitle-2 font-weight-bold mt-4">Требования:</div>

                           
                            <div class="text-subtitle-2" v-for="(req, i) in talent.requirements">
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

            </v-col>
        </v-row>
        </v-container>
         <!--! Окно первое конец-->
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
    </v-card>    
  </v-container>
</template>

<script setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const tab =ref(0)

//получаем данные
const talentsD = ref(null)
//const requirementsD =ref(null)
talentsD.value = await getTalents()
//requirementsD.value = await getrequirements()
//console.log(talentsD.value)
async function getTalents() { return await $fetch('/api/w_talent') } 



//если юзер не вошел, то на главную
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
