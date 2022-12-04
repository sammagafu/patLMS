<template>

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
            
            axios.get('course/enrolled/')
            .then(respose =>{

            })
            .catch(error =>{

            });
        })

    }

}
</script>