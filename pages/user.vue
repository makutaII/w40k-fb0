<template>
        <v-container>
        <h1 class="ma-lg-9">Профиль</h1>
    <div>

    </div>
    </v-container>
</template>

<script setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
// //если юзер вошел, то на главную
 watchEffect(() => {
//     console.log(user.value);
  if (!user.value) {
    return navigateTo("/");
  }
});
</script>

<style scoped>

</style>