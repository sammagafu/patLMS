<template>
 <div class="pt-16">
        <h3 class="py-4 font-bold dark:text-gray-400 text-3xl">Discussion</h3>
</div>
<div class="discussionCard py-4">
    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="@/assets/images/placeholder/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
    
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    
  </div>
</figure>
</div>
</template>

<script>
import { ref,onMounted } from 'vue';
import axiosInstance from '../../http';
export default{
    name:"EnrolledCourse",
    setup(){
        const enrolledCourse = ref([])
        const topic = ref([])
        onMounted(()=>{
            
            axiosInstance.get('course/')
            .then(respose =>{

            })
            .catch(error =>{

            });
        })

    }

}
</script>