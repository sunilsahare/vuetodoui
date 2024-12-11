import { defineStore } from 'pinia';
import { computed } from 'vue';

import { ref } from 'vue';

const usePrivateState = defineStore('secret-store', () => {
    const username = ref(null)
    return { username }
})

export const useUserStore = defineStore('userStore', () => {

    const privateState = usePrivateState()

    const load = (userForm) => {
        const un = localStorage.getItem("username")
        console.log("username:" + un)
        if (un) {
            privateState.username = un;
        }
    }


    const login = (userForm) => {
        if (userForm.username) {
            localStorage.setItem("username", userForm.username);
            privateState.username = userForm.username;
        } else {
            throw "Error: UN is null"
        }
    }
    const logout = () => {
        privateState.username = null;
        localStorage.removeItem("username")
    }
    const isAuthenticated = computed(() => {
        const result = !!privateState.username
        return result
    })

    const username = computed(() => privateState.username)

    return { load, login, logout, isAuthenticated, username }
});

