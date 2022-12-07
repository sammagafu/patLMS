<template>
    <div class="flex flex-row">
        <div class="basis-3/4 mr-16">
            <div class="pt-16">
                <div class="py-4 flex flex-row justify-between dark:text-gray-400">
                    <h2 class="font-bold text-3xl">{{ course.name }}</h2>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </a>
                </div>
                <p class="text-baseline dark:text-gray-200">{{ course.description }}</p>
            </div>
            <div class="rouded my-4 py-4 px-4 rounded-md dark:bg-slate-600" v-for="lesson in course.lesson">
                <h3 class="dark:text-white font-medium text-2xl">{{ lesson.title }}</h3>
                <div class="">
                    <div class="py-2 flex flex-row">
                        <div class="text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <div class="text-gray-400 px-3">
                            <a :href="lesson.courseDocument.document">{{ lesson.courseDocument.title }}</a>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="py-2 flex flex-row">
                        <div class="text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                            </svg>

                        </div>
                        <div class="text-gray-400 px-3">
                            <a :href="lesson.courseVideo.video">{{ lesson.courseVideo.title }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="basis-1/4">
            <div class="bg-slate-600">
                <div class="image mt-16">
                    <img :src="course.cover" :alt="course.name">
                </div>
                <div class="py-6 mx-2">
                    <h3 class="font-bold text-gray-100 text-2xl">TZS {{ course.courseprice }}</h3>
                </div>
                <div class="py-3 mx-2">
                    <button type="button" @click="enrollCource"
                        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Enroll
                        Now</button>
                </div>
            </div>
        </div>
    </div>



</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from 'axios';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import { userStore, pagesInteractivity } from '@/stores/index'
import axiosInstance from "../../http";
export default {
    components: {
        Modal,
    },
    setup() {
        const course = ref([])
        const isOpen = ref(false)
        const route = useRoute()
        const courseID = ref(0)
        const addvideo = ref(false)

        // data variables to post
        const coursename = ref('')
        const courseDescription = ref('')

        onMounted(() => {
            axiosInstance.get(`course/${route.params.slug}`)
                .then(response => {
                    course.value = response.data;
                    courseID.value = response.data.pk
                    console.log(course.value);
                })
                .catch(error => {
                    console.log(error);
                });
        })

        function navigateTo(pk) {
            console.log(pk);
        }

        function showModal() {
            isOpen.value = true
        }

        function closeModal() {
            isOpen.value = false
        }

        function addVideoModal() {
            addvideo.value = true
        }

        function closeAddVideo() {
            addvideo.value = false
        }

        // a function to create course fo tuitors only
        function enrollCource() {
            const data = {
                course:course.value.pk,
                is_paid:true
            }
            console.log(data);
            axiosInstance.post('course/enrolled/', data)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
        }

        return { coursename, courseDescription, course, isOpen, addvideo, navigateTo, enrollCource, showModal, closeModal, addVideoModal, closeAddVideo }
    }

}
</script>