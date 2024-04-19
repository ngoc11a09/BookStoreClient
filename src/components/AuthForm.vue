<template>
    <form @submit.prevent="submit" class="w-25 mx-auto">
        <v-text-field v-model="username.value.value" :counter="25" :error-messages="username.errorMessage.value"
            label="Username"></v-text-field>

        <v-text-field type="password" v-model="password.value.value" :counter="25"
            :error-messages="password.errorMessage.value" label="Password"></v-text-field>

        <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
            v-if="!signin === true"></v-text-field>

        <v-btn class="w-100 my-5" color="green" type="submit" variant="elevated">
            Submit
        </v-btn>
        <v-btn @click="handleReset" class="w-100 " color="red" variant="tonal">
            Clear
        </v-btn>
    </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import type { ISignInData, ISignUpData } from '@/interfaces/auth.interface';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';

const props = defineProps({
    signin: Boolean
})

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        username(value: string) {
            if (!value) return 'Username is required.'
            if (value?.length < 4) return 'Username needs to be at least 4 characters.'
            if (value?.length > 25) return 'Username needs to be less than 25 characters.'
            return true
        },
        password(value: string) {
            if (!value) return 'Password is required.'
            if (value?.length < 8 || !(/[0-9-]+/.test(value))) return 'Password needs to be at least 8 characters and digits.'
            if (value?.length > 25 || !(/[0-9-]+/.test(value))) return 'Password needs to be less than 25 characters and digits.'
            return true
        },
        email(value: string) {
            if (!value) return 'Email is required.'
            // eslint-disable-next-line no-useless-escape
            if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))) return 'Must be a valid e-mail.'
            return true
        },
    },
})
const username = useField('username')
const password = useField('password')
const email = useField('email')

const submit = handleSubmit(async (values) => {
    const authStore = useAuthStore()
    if (props.signin) {
        try {
            (await authStore.signIn(values as ISignInData));
        } catch (error: any) {
            alert(error.message)
        }
    } else {
        try {
            (await authStore.signUp(values as ISignUpData));
        } catch (error: any) {
            alert(error.message)
        }
    }
})
</script>