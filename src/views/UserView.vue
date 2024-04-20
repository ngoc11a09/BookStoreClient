<template>
    <v-sheet class="d-flex flex-column mt-10 w-75 mx-auto ga-10">
        <v-sheet class="mx-auto d-flex flex-column">
            <v-avatar size="150" color="blue-grey-darken-1">
                <v-icon icon="mdi-account" size="80"></v-icon>
            </v-avatar>
            <div class="text-center text-h5 text-blue-grey-darken-1">{{ user?.lastName }} {{ user?.name }}</div>
        </v-sheet>
        <v-sheet class="d-flex flex-row ga-5">
            <div class="d-flex flex-column flex-1-1 w-50 ga-2">
                <v-card :flat="true" class="w-100">
                    <v-card-title class="text-lg-h5">Email:</v-card-title>
                    <v-card-text class="ml-5">
                        {{ user?.email }}
                    </v-card-text>
                </v-card>
                <v-card :flat="true" class="w-100">
                    <v-card-title class="text-lg-h5">Address:</v-card-title>
                    <v-card-text class="ml-5">
                        {{ district }} - {{ province }}
                    </v-card-text>
                </v-card>
                <v-card :flat="true" class="w-100">
                    <v-card-title class="text-lg-h5">Phone number:</v-card-title>
                    <v-card-text class="ml-5">
                        {{ user?.phone }}
                    </v-card-text>
                </v-card>
                <div class="w-100 d-flex flex-row ga-5">
                    <v-card :flat="true" class="w-50">
                        <v-card-title class="text-lg-h5">Gender:</v-card-title>
                        <v-card-text class="ml-5">
                            {{ gender }}
                        </v-card-text>
                    </v-card>
                    <v-card :flat="true" class="w-50">
                        <v-card-title class="text-lg-h5">Age:</v-card-title>
                        <v-card-text class="ml-5">
                            {{ age }}
                        </v-card-text>
                    </v-card>
                </div>
                <v-card :flat="true" class="w-100">
                    <v-card-title class="text-lg-h5">Birthday:</v-card-title>
                    <v-card-text class="ml-5">
                        {{ formatDate(birthday) }}
                    </v-card-text>
                </v-card>
            </div>
            <v-container class="d-flex flex-1-1 w-50">
                <v-row class="w-100 border-sm" justify="space-around">
                    <v-date-picker :key="pickerKey" class="w-100" title="Birthday" color="blue-grey-darken-4"
                        v-model="datePicker" :allowed-dates="allowDate" />
                </v-row>
            </v-container>
        </v-sheet>
    </v-sheet>
</template>
<script setup lang="ts">
import { getOne, type IUserRes } from '@/api/user.api';
import { USER } from '@/constants/localStorage';
import { format, getYear, toDate } from 'date-fns';
import { ref, onMounted } from 'vue';
const user = ref<IUserRes>()
const gender = ref<string>()
const age = ref<number>()
const province = ref<string>()
const district = ref<string>()
const today = getYear(new Date(Date.now()))

const datePicker = ref()
const pickerKey = ref(0)
const min = ref()
const max = ref()
const allowDate = ref()


const formatDate = (date: Date | null | undefined) => {
    if (!date) return;
    return format(new Date(date as Date), 'dd/MM/yyyy');
};
const provinces = [
    { title: 'Can Tho', text: 'cantho', value: 'cantho' },
    { title: 'TP Ho Chi Minh', text: 'tphcm', value: 'tphcm' },
]
const districts = [
    { title: 'Ninh Kieu', text: 'Ninh Kieu', value: 'ninhkieu' },
    { title: 'An Khanh', text: 'An Khanh', value: 'ankhanh' },
    { title: 'Cai Rang', text: 'Cai Rang', value: 'cairang' },
    { title: 'Xuan Khanh', text: 'Xuan Khanh', value: 'xuankhanh' },
    { title: 'Quan 1', text: 'Quan 1', value: 'quan1' },
    { title: 'Quan 2', text: 'Quan 2', value: 'quan2' },
    { title: 'Quan 3', text: 'Quan 3', value: 'quan3' },
    { title: 'Quan Thu Duc', text: 'Quan Thu Duc', value: 'quanthuduc' },
]

const birthday = ref()
onMounted(async () => {
    try {
        const id = JSON.parse(localStorage.getItem(USER) as string)._id
        const res = await getOne(id)
        user.value = res.user
        age.value = Math.floor(today - getYear(user.value.birthday!))
        if (user.value.gender == '0') gender.value = 'Male'
        else if (user.value.gender == '1') gender.value = 'Female'
        else gender.value = 'Unknow'

        provinces.map((item: any) => {
            if (item.value === user.value?.address[0]) province.value = item.title
        })
        districts.map((item: any) => {
            if (item.value === user.value?.address[1]) district.value = item.title
        })
        birthday.value = toDate(user.value.birthday as Date);
        datePicker.value = new Date(birthday.value)
        min.value = new Date(user.value.birthday!)
        max.value = new Date(user.value.birthday!)
        allowDate.value = [new Date(user.value.birthday!)]
        pickerKey.value++;
    } catch (error: any) {
        alert(error.message)
    }
})

</script>