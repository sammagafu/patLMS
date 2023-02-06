<template>
  <div>
    <div v-html="url"></div>
  </div>
  <div class="py-3 text-2xl dark:text-gray-200">{{title}}</div>
  <div class="text-sm dark:text-gray-400">{{learn}}</div>
</template>

<script>

export default {
  name: 'CourseVideo',
  props: {
    title: String,
    url: String,
    learn:String
  },
  
}
</script>