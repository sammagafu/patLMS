<template>
    <div class="pt-16">
        <h2 class="py-4 font-bold dark:text-gray-400 text-3xl">{{ course.name }}</h2>
        <p class="text-baseline dark:text-gray-200">{{ course.description }}</p>
    </div>

    <div class="pt-4" v-if="course.lesson === null">
        <h2 class="py-4 font-bold dark:text-gray-400 text-3xl">Course has no lessons</h2>
    </div>

    <div class="py-8">
        <button
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button" data-modal-toggle="defaultModal" @click="showModal">Add Lesson</button>
    </div>

    <div class="rouded my-4 py-4 px-4 rounded-md dark:bg-slate-600" v-for="lesson in course.lesson" :key="course.pk">
        <h3 class="dark:text-white font-medium">{{ lesson.title }}</h3>
        <p class="dark:text-gray-300 font-baseline">{{ lesson.content }}</p>

        <div v-if="!lesson.courseVideo && !lesson.courseDocument" class="pt-3">
            <p class="py-4">Add Lesson video or Document</p>
            <div class="flex mb-4">
                <button type="button" @click="addVideoModal" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add video</button>
                <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Document</button>
            </div>
        </div>
    </div>



    <Modal v-show="isOpen" @close="closeModal">
        <!-- <header
        id="modal-header"
        class="px-4 py-6 flex justify-between items-center border-b-2 border-white"
      >
        <slot name="header">Dummy header</slot>
        <button
          type="button"
          class="w-7 p-2 bg-gray-300 rounded-full"
          @click="close"
        >
          <img src="../assets/letter-x.svg" alt="close button" />
        </button>
      </header> -->
    <template v-slot:body>
        <div class="px-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Lesson for {{ course.name }}</h3>
                <form class="space-y-6" @submit.prevent="createLesson">
                    <div>
                        <label for="coursename" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course Name</label>
                        <input type="text" name="email" id="coursename" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="course name" required v-model="coursename">
                    </div>
                    <div>
                        <label for="coursedisc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What will student learn</label>
                        <textarea name="" id="coursedisc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required v-model="courseDescription"></textarea>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Course</button>
                </form>
            </div>
    </template>
<!-- 
    <footer id="modal-footer" class="px-4 py-6 border-t-2 border-white">
        <slot name="footer"></slot>
      </footer> -->
  </Modal>
<Modal v-show="addvideo" @close="closeAddVideo">
    <template v-slot:body>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add video </h3>
        <div>
            <label for="videolink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Video Link</label>
            <input type="url" name="video" id="videolink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="course name" required>
            <input type="hidden" name="" :value="course.pk">
        </div>
    </template>
</Modal>


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

        function addVideoModal(){
            addvideo.value = true
        }

        function closeAddVideo(){
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

        return { coursename, courseDescription, course, isOpen,addvideo, navigateTo, createLesson,showModal,closeModal,addVideoModal,closeAddVideo }
    }

}
</script>