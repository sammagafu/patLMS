<template>
 <div class="pt-16">
        <h3 class="py-4 font-bold dark:text-gray-400 text-3xl">Discussion</h3>
</div>
<div class="discussionCard py-4">
    <div class="flex flex-row p-4 shadow-md rounded-sm">
    <div class="users"></div>
    <div class="feedback"></div>
</div>
</div>
</template>

<script>
import { ref,onMounted } from 'vue';
import axios from 'axios';
export default{
    name:"EnrolledCourse",
    setup(){
        const enrolledCourse = ref([])
        const topic = ref([])
        onMounted(()=>{
            
            axios.get('course/')
            .then(respose =>{

            })
            .catch(error =>{

            });
        })

    }

}
</script>