<template>
    <v-container>
        <AppNumbersComposition />
        <AppNumbersOptions />
    </v-container>
</template>

<script>
import AppNumbersComposition from '../components/AppNumbersComposition.vue';
import AppNumbersOptions from '../components/AppNumbersOptions.vue';

export default {
    components: {
        AppNumbersComposition,
        AppNumbersOptions,
    },

    name: 'SkillView',
}
</script>