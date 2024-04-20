<template>
    <div :class="['text-h3', 'pa-2', 'my-10']" class="text-center text-blue-grey-darken-2">Books</div>
    <div class="w-75 mx-auto">
        <v-table :hover="true">
            <thead class="text-h6 text-blue-grey-darken-2">
                <tr>
                    <th class="text-left">
                        Code
                    </th>
                    <th class="text-left">
                        Title
                    </th>
                    <th class="text-left">
                        Price
                        <span class="text-subtitle-2">VND</span>
                    </th>
                    <th class="text-left">
                        Quantity
                    </th>
                    <th class="text-left">
                        Author
                    </th>
                    <th class="text-left">
                        Publisher
                    </th>
                    <th class="text-left">
                        Create at
                    </th>
                    <th class="text-center">
                        Borrow
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.code">
                    <td>{{ item.code }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.author }}</td>
                    <td>{{ item.publisher }}</td>
                    <td>{{ formatDateTime(item.createdAt) }}</td>
                    <td class="text-center">
                        <v-btn :disabled="item.quantity < 1 || !user" variant="tonal"
                            @click="() => handleClickBorrow(item._id)">
                            <v-icon icon="mdi-plus-thick"></v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
<script setup lang="ts">
import { getAllBooks, type IBookRes } from '@/api/book.api';
import { getAllPublishers } from '@/api/publisher.api';
import type { IPublisher } from '@/interfaces/publisher.interface';
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import router from '@/router';
import { USER } from '@/constants/localStorage';

const user = JSON.parse(localStorage.getItem(USER) as string)

const formatDateTime = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
};

const handleClickBorrow = (id: string) => {
    router.push(`/borrows/add/${id}`)
}
const data = ref<IBookRes[]>([])
let publishers: IPublisher[]

onMounted(async () => {
    try {
        const res = await getAllBooks()
        try {
            publishers = (await getAllPublishers())
            const processedPublisher: any = publishers.reduce((prev, publisher) => {
                return { ...prev, [publisher.code]: publisher }
            }, {})

            data.value = res.map((item) => {
                const publisher = processedPublisher[item.publishCode]
                return { ...item, publisher: publisher.name }
            })
        } catch (error: any) {
            alert(error.message)
        }
    } catch (error: any) {
        alert(error.message)
    }
})
</script>