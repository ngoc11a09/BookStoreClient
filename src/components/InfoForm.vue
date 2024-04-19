<template>
    <div :class="['text-h2', 'pa-2', 'my-10']" class="text-center text-blue-grey-darken-2">Information</div>

    <form @submit.prevent="submit" class="w-50 mx-auto">
        <v-text-field v-model="name.value.value" :counter="25" :error-messages="name.errorMessage.value"
            label="Name"></v-text-field>
        <v-text-field v-model="lastName.value.value" :counter="30" :error-messages="lastName.errorMessage.value"
            label="Lastname"></v-text-field>
        <v-radio-group inline label="Gender" v-model="gender.value.value" :error-messages="gender.errorMessage.value">
            <v-radio label="Male" value="0"></v-radio>
            <v-radio label="Female" value="1"></v-radio>
            <v-radio label="Unknow" value="unknow"></v-radio>
        </v-radio-group>
        <v-text-field v-model="phone.value.value" :max="today" :counter="10" :error-messages="phone.errorMessage.value"
            label="Phone Number"></v-text-field>

        <v-select v-model="selectedProvince.value.value" :items="provinces" label="Select province"
            @update:model-value="onProvinceChange" :error-messages="selectedProvince.errorMessage.value"></v-select>
        <v-select v-model="selectedDistrict.value.value" :items="districts" label="Select district"
            v-if="selectedProvince.value.value" :error-messages="selectedDistrict.errorMessage.value"></v-select>

        <v-date-picker view-mode="year" :allowed-dates=allowDate color="blue-grey-darken-2" width="100%"
            title="Birthday" v-model="birthday.value.value" :error-messages="birthday.errorMessage.value"
            header="Birthday"></v-date-picker>
        <span class="text-red-darken-4" v-if="birthday.errorMessage.value">{{ birthday.errorMessage.value }}</span>
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
import router from '@/router';
import { ref } from 'vue';
import { updateOne } from '@/api/user.api';
import type { IUserInfo } from '@/interfaces/user.interface';

const props = defineProps({
    id: String,
})

const today = new Date(Date.now())
const allowDate = (date: any) => {
    return date <= today
}

const provinces = [
    { title: 'Can Tho', text: 'cantho', value: 'cantho' },
    { title: 'TP Ho Chi Minh', text: 'tphcm', value: 'tphcm' },
]

const districts: any = ref([]);

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value: string) {
            if (value?.length >= 1) return true
            return 'Name is required.'
        },
        lastName(value: string) {
            if (value?.length >= 1) return true
            return 'Lastname is required.'
        },
        gender(value: string) {
            if (value?.length >= 1) return true
            return 'Gender is required.'
        },
        selectedProvince(value: string | null) {
            if (value) return true
            return 'Province is required.'
        },
        selectedDistrict(value: string | null) {
            if (value) return true
            return 'District is required.'
        },
        birthday(value: Date) {
            if (!value) return 'Birthday is required.'
            if (value > today) return 'Invalid birthday.'
            return true
        },
        phone(value: string) {
            if (value?.length === 10 && /[0-9-]+/.test(value)) return true
            return 'Phone number needs to be 10 digits.'
        },
    },
    initialValues: {
        name: '',
        lastName: '',
        phone: '',
        gender: null,
        birthday: null,
        selectedDistrict: null,
        selectedProvince: null
    },
})

const name = useField('name')
const lastName = useField('lastName')
const phone = useField('phone')
const gender = useField('gender')
const birthday = useField<Date>('birthday')
const selectedDistrict = useField('selectedDistrict')
const selectedProvince = useField('selectedProvince')

const onProvinceChange = () => {
    selectedDistrict.value.value = null;

    if (selectedProvince.value.value === 'cantho') {
        districts.value = [
            { title: 'Ninh Kieu', text: 'Ninh Kieu', value: 'ninhkieu' },
            { title: 'An Khanh', text: 'An Khanh', value: 'ankhanh' },
            { title: 'Cai Rang', text: 'Cai Rang', value: 'cairang' },
            { title: 'Xuan Khanh', text: 'Xuan Khanh', value: 'xuankhanh' },
        ];
    } else if (selectedProvince.value.value === 'tphcm') {
        districts.value = [
            { title: 'Quan 1', text: 'Quan 1', value: 'quan1' },
            { title: 'Quan 2', text: 'Quan 2', value: 'quan2' },
            { title: 'Quan 3', text: 'Quan 3', value: 'quan3' },
            { title: 'Quan Thu Duc', text: 'Quan Thu Duc', value: 'quanthuduc' },
        ];
    } else {
        districts.value = [];
    }
};


const submit = handleSubmit(async (values) => {
    const { selectedDistrict, selectedProvince, ...rest } = values
    try {
        await updateOne(props.id!, { ...rest, address: [selectedProvince, selectedDistrict] as any } as IUserInfo)
        router.push('/')
    } catch (error: any) {
        alert(error.message)
    }
})
</script>