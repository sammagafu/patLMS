<template>
  <div id="authentication-modal" tabindex="-1" aria-hidden="true"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" :class="{ hidden: isOpen }">
    <div class="pt-32 mx-auto w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">


      <header
        id="modal-header"
        class="px-4 py-6 flex justify-between items-center"
      >
        <slot name="header"></slot>
        <button type="button" @click="close"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only" @click="close">Close modal</span>
        </button>
      </header>
      <!-- Modal Body -->
      <section id="modal-body" class="py-6 px-6 lg:px-8">
        <slot name="body"></slot>
      </section>
            <!-- Modal Footer -->
      <footer id="modal-footer" class="px-4 py-6">
        <slot name="footer"></slot>
      </footer>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
  