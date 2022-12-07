<template>
  <div class="header py-16 flex flex-row justify-between dark:text-gray-400">
    <div>
      <h2 class="text-4xl font-bold">My Courses</h2>
      <p class="text-sm">My Enrolled Courses</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
      </svg>
    </div>
  </div>

  <div class="py-3" v-for="course in enrolledCourse" :key="course.pk">
    <figure
      class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-600"
    >
      <img class="max-w-xs" :src="course.course.cover" alt="" />
      <div class="pt-6 md:p-8 text-center md:text-left py-2">
        <figcaption class="font-medium">
          <div class="text-sky-500 dark:text-sky-400 text-2xl">
            <router-link
              :to="{
                name: 'enrolled-details',
                params: { slug: course.course.slug },
              }"
              >{{ course.course.name }}</router-link
            >
          </div>
          <div
            class="
              text-slate-700
              dark:text-blue-200
              py-4
              flex flex-row
              justify-start
            "
          >
            <div class="flex flex-row space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <p>{{ course.course.pub_date }}</p>
            </div>
            <div class="flex flex-row space-x-1 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>

              <p>Points : {{ course.course.points }}</p>
            </div>
            <div class="flex flex-row space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              <p>TZS {{ course.course.courseprice }}</p>
            </div>
          </div>
        </figcaption>

        <blockquote>
          <p class="font-normal text-sm dark:text-gray-300">
            {{ course.course.description }}
          </p>
        </blockquote>
      </div>
    </figure>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axiosInstance from "../../http";
// import axios from 'axios';

export default {
  name: "EnrolledCourse",
  setup() {
    const enrolledCourse = ref([]);
    const topic = ref([]);
    onMounted(() => {
      axiosInstance
        .get("course/enrolled/")
        .then((respose) => {
          console.log(respose.data);
          enrolledCourse.value = respose.data;
        })
        .catch((error) => {});
    });

    return {
      enrolledCourse,
      topic,
    };
  },
};
</script>