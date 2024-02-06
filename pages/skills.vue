<template>
    <v-container>
        <h1 class="ma-lg-9">Умения</h1>

        <v-row>
            <v-col v-for="(skill, i) in skillsD" :key="i">
                <v-expansion-panels>

                    <v-expansion-panel >
                        <!-- class="bg-surface-variant" -->
                        <v-expansion-panel-title class="pa-2">
                            <v-col cols="9" class="text-capitalize" style="min-width: 210px;">
                                {{ skill.name }}

                            </v-col>

                            <v-divider :thickness="20" class="border-opacity-0" vertical></v-divider>
                            <!-- <v-btn disabled="" size="23" icon="mdi-account" :to="`/talents/${talent.id}`"> -->

                            <!-- </v-btn> -->
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>

                            <!-- <div v-if="talent.requirements[0]" class="text-subtitle-2 font-weight-bold mt-4">Требования:</div> -->

<!--                            
                            <div class="text-subtitle-2" v-for="(req, i) in talent.requirements">
                                {{ req.name }}
                            </div> -->
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

//рабочий вариант для локалки
const skillsD = ref(null)
skillsD.value = await getSkills()
//console.log(talentsD.value)
async function getSkills() { return await $fetch('/api/w_skill') } 



</script>
<script>
export default {
    data: () => ({

    }),
}
</script>

<style scoped></style>