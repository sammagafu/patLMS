<template>
    <div class="flex flex-row">
        <div class="basis-3/4 mr-16">
            <div class="pt-16">
                <h2 class="py-4 font-bold dark:text-gray-400 text-3xl">{{ course.name }}</h2>
                <p class="text-baseline dark:text-gray-200">{{ course.description }}</p>
            </div>
            <div class="rouded my-4 py-4 px-4 rounded-md dark:bg-slate-600" v-for="lesson in course.lesson"
                :key="course.pk">
                <h3 class="dark:text-white font-medium">{{ lesson.title }}</h3>
                <div class="py-2 flex flex-row justify-between">
                   <p><a :href="lesson.courseDocument.document">Documents</a></p>
                   <p><a :href="lesson.courseVideo.video">Videos</a></p>
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
                    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Enroll Now</button>
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
            axios.get(`course/${route.params.slug}`)
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
        function createLesson() {
            const data = {
                title: coursename.value,
                content: courseDescription.value,
                course: courseID.value
            }
            console.log(data);
            axios.post('course/lesson/create/', data)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
        }

        return { coursename, courseDescription, course, isOpen, addvideo, navigateTo, createLesson, showModal, closeModal, addVideoModal, closeAddVideo }
    }

}
</script>