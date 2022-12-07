<template>
    <div class="header py-16 flex flex-row justify-between dark:text-gray-400">
        <div>
            <h2 class="text-4xl font-bold">Courses</h2>
            <p class="text-sm">All courses are found here</p>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>

        </div>
    </div>

    <div class="grid grid-cols-3 gap-8">
        <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" v-for="course in course" :key="course.pk">
            <router-link :to="{name:'course-detail',params:{slug:course.slug}}">
                <img class="rounded-t-lg" :src="course.cover" alt="course name">
            </router-link>
            <div class="px-5 py-6">
                <router-link :to="{name:'course-detail',params:{slug:course.slug}}">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-blue-400">{{course.name}}</h5>
            </router-link>

            <div class="flex flex-row justify-between py-3 font-semibold tracking-tight text-gray-900 dark:text-blue-200">
                        <h6>CPD Points</h6>
                        <h6>{{course.points}} Points</h6>
            </div>
                <div class="py-3">
                    <p class="dark:text-gray-400"> {{course.description.substring(0,100)+".." }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">TZS {{ course.courseprice}}</span>
                    <a href="#"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        to cart</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { userStore, pagesInteractivity } from '@/stores/index'
import axiosInstance from '../../http';
export default {
    setup(){
        const course = ref([])

        onMounted(() => {
            // axiosInstance.get('course/enrolled/')
            axiosInstance.get('course/')
                .then(response => {
                    course.value = response.data;
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        })
        return {course,}
    }

}
</script>