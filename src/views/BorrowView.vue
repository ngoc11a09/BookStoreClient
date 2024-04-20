<template>
    <div :class="['text-h3', 'pa-2', 'my-10']" class="text-center text-blue-grey-darken-2">Borrow list</div>
    <div class="w-75 mx-auto">
        <v-table :hover="true">
            <thead class="text-h6 text-blue-grey-darken-2">
                <tr>
                    <th class="text-left">
                        Code
                    </th>
                    <th class="text-left">
                        Book title
                    </th>
                    <th class="text-left">
                        Borrow date
                    </th>
                    <th class="text-left">
                        Return date
                    </th>
                    <th class="text-left">
                        Created at
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.code">
                    <td>{{ item.code }}</td>
                    <td>{{ item.book }}</td>
                    <td>{{ formatDate(item.borrowedDate as Date) }}</td>
                    <td>{{ formatDate(item.returnDate as Date) }}</td>
                    <td>{{ formatDateTime(item.createdAt as Date) }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
<script setup lang="ts">
import { getAllBooks, type IBookRes } from '@/api/book.api';
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import { getBorrowOfUSer } from '@/api/borrow.api';
import { USER } from '@/constants/localStorage';

const formatDateTime = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
};
const formatDate = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy');
};

const data = ref<any[]>([])
let books: IBookRes[]
const user = JSON.parse(localStorage.getItem(USER) as string)
onMounted(async () => {
    try {
        const res = await getBorrowOfUSer(user._id)
        try {
            books = (await getAllBooks())
            const preBooks: any = books.reduce((prev, book) => {
                return { ...prev, [book.code]: book }
            }, {})

            data.value = res.map((item) => {
                const book = preBooks[item.bookCode]
                return { ...item, book: book.title }
            })
            // console.log(data.value);

        } catch (error: any) {
            alert(error.message)
        }
    } catch (error: any) {
        alert(error.message)
    }
})
</script>