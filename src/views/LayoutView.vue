<template>
    <v-card>
        <v-layout>
            <v-app-bar color="blue-grey-darken-4" prominent>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>Book Store</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="$vuetify.display.mdAndUp">
                    <v-btn icon="mdi-magnify" variant="text"></v-btn>

                    <v-btn icon="mdi-filter" variant="text"></v-btn>
                </template>

                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>

            <v-navigation-drawer :disable-route-watcher="true" v-model="drawer" location="left" temporary>
                <v-list-item class="text-blue-grey-darken-4 pa-4" to="/" link title="Home"
                    prepend-icon="mdi-home"></v-list-item>
                <v-list-item class="text-blue-grey-darken-4 pa-4" to="/books" link title="Book List"
                    prepend-icon="mdi-bookshelf"></v-list-item>
                <v-list-item class="text-blue-grey-darken-4 pa-4" to="/borrows" link title="Borrow"
                    prepend-icon="mdi-book-education"></v-list-item>
                <v-list-item class="text-blue-grey-darken-4 pa-4" :to="linkUser" link title="Account"
                    prepend-icon="mdi-account"></v-list-item>
                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block color="blue-grey-darken-4" @click="handleSignOut" v-if="user">
                            SIGNOUT
                        </v-btn>
                        <v-btn block color="blue-grey-darken-4" to="signin" v-if="!user">
                            SIGNIN
                        </v-btn>
                        <v-btn class="my-2" block color="blue-grey-darken-4" to="signup" v-if="!user">
                            SIGNUP
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>

            <v-main style="min-height: 100vh;">
                <router-view />
            </v-main>
        </v-layout>
    </v-card>
</template>


<script setup lang="ts">
import { USER } from '@/constants/localStorage';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';

const user = JSON.parse(localStorage.getItem(USER) as string)
const linkUser = `/users/${user._id}`

const drawer = ref<boolean>(false)
const handleSignOut = () => {
    try {
        const authStore = useAuthStore()
        authStore.signOut()
    } catch (error: any) {
        alert(error.message)
    }
}
</script>
<style>
.signout-btn {
    position: absolute;
    z-index: 10;
    height: 64px;
    padding: 20px;
    box-sizing: border-box;
    right: 0;
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0) !important;
    /* background-color: #D33A2C; */
}

.signout-btn:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>