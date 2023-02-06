<template>
  <div class="pt-16 flex flex-row justify-between dark:text-gray-300">
    <h2>&nbsp;</h2>
    <div>
      <router-link :to="{ name: 'enrolled' }" class="px-3">Back</router-link>
    </div>
  </div>
  <div class="py-3 flex flex-row">
    <div class="basis-4/6 pr-4">
      <div class="aspect-w-16 aspect-h-9">
        <CourseVideo
          :title="nowPlayingTitle"
          :url="nowPlaying"
          :learn="nowPlayingDescription"
        />
      </div>
      <div class="py-6">
        <div class="discussion">
          <form @submit.prevent="publishComment">
            <label
              for="message"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-white
              "
              >Open Discussion</label
            >
            <div class="mb-6">
              <input
                type="text"
                id="default-input"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                "
                placeholder="Enter your question here ..."
                v-model="disscussionTopic"
              />
            </div>
            <textarea
              id="message"
              rows="4"
              class="
                block
                p-2.5
                w-full
                text-sm text-gray-900
                bg-gray-50
                rounded-lg
                border border-gray-300
                focus:ring-blue-500 focus:border-blue-500
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              placeholder="Write your question or discussion here..."
              v-model="discussionDescription"
            ></textarea>

            <button
              type="submit"
              class="
                inline-flex
                items-center
                px-5
                my-2
                py-2
                text-sm
                font-medium
                text-center text-white
                bg-blue-700
                rounded-lg
                focus:ring-4 focus:ring-blue-200
                dark:focus:ring-blue-900
                hover:bg-blue-800
              "
            >
              Publish post
            </button>
          </form>
        </div>
        <!-- <Tabs></Tabs> -->
      </div>
    </div>
    <div class="basis-2/6 lg:pl-4">
      <div class="course">
        <div
          class="dark:bg-slate-600 py-3 px-2 dark:text-blue-100 rounded"
          v-for="lesson in course.lesson"
          :key="lesson.index"
          @click="
            playCourse(
              lesson.courseVideo.video,
              lesson.courseVideo.title,
              lesson.content
            )
          "
        >
          <p class="py-1">{{ lesson.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import CourseVideo from "@/components/course/CoursesVideo.vue";
import Tabs from "@/components/Tabs.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { userStore, pagesInteractivity } from "@/stores/index";
import axiosInstance from "../../http";
export default {
  components: {
    Modal,
    CourseVideo,
    Tabs,
  },
  setup() {
    // video data
    const nowPlaying = ref("");
    const nowPlayingTitle = ref("");
    const nowPlayingDescription = ref("");

    // discussion starts here
    const disscussionTopic = ref("");
    const discussionDescription = ref("");

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
          nowPlaying.value = response.data.introvideo;
          nowPlayingTitle.value = response.data.name;
          nowPlayingDescription.value = response.data.description;
        })
        .catch((error) => {
          console.log(error);
        });
    });

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

    function playCourse(playing, title, description) {
      nowPlaying.value = playing;
      nowPlayingTitle.value = title;
      nowPlayingDescription.value = description;
    }

    function publishComment() {
      const data = {
        course_topic: course.value.pk,
        topic:disscussionTopic.value,
        content: discussionDescription.value,
      };
      axiosInstance
        .post("discussion/", data)
        .then((respose) => {})
        .catch((error) => {});
    }

    return {
      nowPlaying,
      nowPlayingTitle,
      nowPlayingDescription,
      coursename,
      courseDescription,
      course,
      isOpen,
      disscussionTopic,
      discussionDescription,
      enrollCource,
      playCourse,
      publishComment,
    };
  },
};
</script>