<template>
    <div class="pt-16">
        <h2 class="py-4 font-bold dark:text-gray-400 text-3xl">Welcome {{userstore.userData.full_name}}</h2>
    </div>
    <div v-if="userstore.userData.is_student">
        <UserDashboard></UserDashboard>
    </div>
    <div v-else-if="userstore.userData.is_tuitor">

    </div>

</template>

<script>
// import Modal from "@/components/Modal.vue";
// import UserDashboard from "@components/UserDashboard.vue";
import AdminDashboard from "@/components/AdminDashboard.vue";
import UserDashboard from "../components/UserDashboard.vue";

import { userStore, pagesInteractivity } from '@/stores/index'


export default{
    setup(){
        const userstore = userStore()

        return {
            userstore
        }
    },
    components : {
        AdminDashboard,UserDashboard
    }
}
</script>
