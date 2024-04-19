<template>
    <info-form :id />
</template>

<script setup lang="ts">
import InfoForm from '@/components/InfoForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = route.params.id as string
</script>