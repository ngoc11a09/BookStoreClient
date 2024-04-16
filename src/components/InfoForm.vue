<template>
    <div :class="['text-h2', 'pa-2', 'my-10']" class="text-center text-blue-grey-darken-2">Infomation</div>

    <form @submit.prevent="submit" class="w-25 mx-auto">
        <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
            label="Name"></v-text-field>
        <v-text-field v-model="lastName.value.value" :counter="10" :error-messages="lastName.errorMessage.value"
            label="Lastname"></v-text-field>
        <v-radio-group inline label="Gender" v-model="gender.value.value" :error-messages="gender.errorMessage.value">
            <v-radio label="Male" value="0"></v-radio>
            <v-radio label="Female" value="1"></v-radio>
            <v-radio label="Unknow" value="unknow"></v-radio>
        </v-radio-group>
        <v-text-field v-model="phone.value.value" :counter="10" :error-messages="phone.errorMessage.value"
            label="Phone Number"></v-text-field>
        <v-date-picker v-model="birthday.value.value" :error-messages="birthday.errorMessage.value" header="Birthday"
            max="today"></v-date-picker>
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
import { signUp } from '@/api/auth.api';
import type { ISignUpData } from '@/interfaces/auth.interface';
import router from '@/router';
import { useDate } from 'vuetify';

const today = new Date(Date.now())

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value: any) {
            if (value?.length >= 2) return true

            return 'Name needs to be at least 2 characters.'
        },
        phone(value: any) {
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true

            return 'Phone number needs to be at least 9 digits.'
        },
    },
})
const name = useField('name')
const lastName = useField('lastName')
const phone = useField('phone')
const gender = useField('gender')
const birthday = useField('birthday')
const address = useField('address')

const submit = handleSubmit(async (values) => {
    try {
        await signUp(values as ISignUpData)
        router.push('signup/info')
    } catch (error: any) {
        alert(error.errorMessage)
    }
})
</script>