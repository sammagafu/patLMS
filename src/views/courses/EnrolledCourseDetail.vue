<template>
  <div class="pt-16 flex flex-row justify-between dark:text-gray-300">
    <h2>{{ course.name }}</h2>
    <div>
      <router-link :to="{ name: 'enrolled' }" class="px-3">Back</router-link>
    </div>
  </div>
  <div class="py-3 flex flex-row">
    <div class="basis-4/6 pr-4">
      <div class="aspect-w-16 aspect-h-9">
        <CourseVideo :title="nowPlayingTitle" :url="nowPlaying"/>
      </div>
    </div>
    <div class="basis-2/6 lg:pl-4">
        <div class="course">
            <div class="dark:bg-slate-600 py-3 px-2 dark:text-blue-100 rounded" v-for="lesson in course.lesson" :key="lesson.index" @click="playCourse(lesson.courseVideo.video,lesson.courseVideo.title,lesson.content)">
                <p class="py-1">{{lesson.title}}</p>
            </div>
        </div>
    </div>
  </div>
  <!-- <div class="video">
    <div v-html="course.introvideo" class="aspect-w-16 aspect-h-9"></div>
  </div> -->
</template>

<script>
import Modal from "@/components/Modal.vue";
import CourseVideo from "@/components/course/CoursesVideo.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { userStore, pagesInteractivity } from "@/stores/index";
import axiosInstance from "../../http";
export default {
  components: {
    Modal,CourseVideo
  },
  setup() {
    const nowPlaying = ref("")
    const nowPlayingTitle = ref("")
    const nowPlayingDescription = ref("")

    const course = ref([]);
    const isOpen = ref(false);
    const route = useRoute();
    const courseID = ref(0);
    const addvideo = ref(false);

    // data variables to post
    const coursename = ref("");
    const courseDescription = ref("");

    onMounted(() => {
      axiosInstance
        .get(`course/${route.params.slug}`)
        .then((response) => {
          course.value = response.data;
          courseID.value = response.data.pk;
          nowPlaying.value = response.data.introvideo
          nowPlayingTitle.value = response.data.name
          nowPlayingDescription.value = response.data.description
        })
        .catch((error) => {
          console.log(error);
        });
    });

    function navigateTo(pk) {
      console.log(pk);
    }

    function showModal() {
      isOpen.value = true;
    }

    function closeModal() {
      isOpen.value = false;
    }

    function addVideoModal() {
      addvideo.value = true;
    }

    function closeAddVideo() {
      addvideo.value = false;
    }

    // a function to create course fo tuitors only
    function enrollCource() {
      const data = {
        course: course.value.pk,
        is_paid: true,
      };
      console.log(data);
      axiosInstance
        .post("course/enrolled/", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function playCourse(playing,title,description){
        nowPlaying.value = playing
        nowPlayingTitle.value = title
        nowPlayingDescription.value = description

    }

    return {
        nowPlaying,
        nowPlayingTitle,
        nowPlayingDescription,
      coursename,
      courseDescription,
      course,
      isOpen,
      addvideo,
      nowPlaying,
      navigateTo,
      enrollCource,
      showModal,
      closeModal,
      addVideoModal,
      closeAddVideo,
      playCourse

    };
  },
};
</script>

<style scoped>
.video {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}
iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>