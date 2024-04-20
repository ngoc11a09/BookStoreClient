<template>
    <div :class="['text-h2', 'pa-2', 'my-10']" class="text-center text-blue-grey-darken-2">Borrow book</div>
    <div class="text-button text-center">{{ book?.code }} - {{ book?.title }}</div>
    <form @submit.prevent="submit" class="w-50 mx-auto">
        <v-date-picker multiple=2 :allowed-dates=allowDate color="blue-grey-darken-2" width="100%"
            title="Borrow Date - Return Date" v-model="date.value.value" :error-messages="date.errorMessage.value"
            header="Please select"></v-date-picker>
        <span class="text-red-darken-4" v-if="date.errorMessage.value">{{ date.errorMessage.value }}</span>
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getOneBook, type IBookRes } from '@/api/book.api';
import { USER } from '@/constants/localStorage';
import { create, type IBorrow } from '@/api/borrow.api';
import { Util } from '@/utils';
import { getOne } from '@/api/user.api';

const route = useRoute()
const id = route.params.id

const today = new Date(Date.now())
const allowDate = (date: any) => {
    return date >= today
}
const book = ref<IBookRes>()
onMounted(async () => {
    try {
        const res = await getOneBook(id as string)
        book.value = res.book
    } catch (error: any) {
        alert(error.message)
    }
})

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        date(value: Date[]) {
            if (!value?.[0] || !value?.[1]) return 'Please select 2 days.'
            return true
        },
    }
})

const date = useField<Date>('date')

let uId: string
const submit = handleSubmit(async (values) => {
    const borrowedDate: Date = (values.date?.[0] > values.date?.[1]) ? values.date?.[1] : values.date?.[0]
    const returnDate: Date = (values.date?.[0] <= values.date?.[1]) ? values.date?.[1] : values.date?.[0]
    const code = `U${Util.randomInt(4)}`
    // console.log({ code, userCode: uId, borrowedDate, returnDate, bookCode: book.value?.code });
    const id = JSON.parse(localStorage.getItem(USER) as string)._id
    try {
        const user = await getOne(id)
        uId = user.user.uId
    } catch (error) {
        alert('Try again!')
    }
    try {
        await create({ code, userCode: uId, borrowedDate, returnDate, bookCode: book.value?.code } as IBorrow)
        alert('Borrow successfully')
        router.push('/borrows')
    } catch (error: any) {
        alert(error.message)
    }
})
</script>