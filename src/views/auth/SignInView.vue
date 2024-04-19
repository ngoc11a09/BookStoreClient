<template>
    <div :class="['text-h2', 'pa-2', 'my-10']" class="text-center text-blue-grey-darken-2">Sign In</div>

    <auth-form :signin="true" />
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue';
</script>