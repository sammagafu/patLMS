<template>
  <div>
    <div v-html="url"></div>
  </div>
  <div>{{title}}</div>
  <div>{{what_you_will_learn}}</div>
</template>

<script>

export default {
  name: 'CourseVideo',
  props: {
    title: String,
    url: String,
    what_you_will_learn:String
  },
  
}
</script>