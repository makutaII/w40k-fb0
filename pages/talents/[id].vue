<template>

    <div class="mb-16">
       <div> Талант  {{ t.title }}</div> 
    </div>

</template>

<script setup>
const { id } = useRoute().params
//const uri = '../db/talents.json'
const uri = 'https://fakestoreapi.com/products/' + id
console.log(uri)
// чтение из файла из паблик-папки
const { data: t } = await useFetch(uri) 

// definePageMeta({
//     layout: 'pers'
//})
</script>
<style scoped></style>