<template>
  <section class="my-12 mx-6">
    <div class="text-center mb-12" data-aos="fade-up">
      <h4 class="text-xl font-bold dark:text-white">Liên hệ với tôi</h4>
      <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
    </div>
    <form method="post" class="dark:text-white">
      <div class="flex mb-4">
        <div class="w-1/2 mr-4 flex flex-col" data-aos="fade-up">
          <input
            type="text"
            placeholder="Tên"
            class="mb-4 p-2 bg-gray-200 dark:bg-gray-800 focus:bg-transparent outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            class="my-4 p-2 bg-gray-200 dark:bg-gray-800 focus:bg-transparent outline-none"
          />
          <input
            type="text"
            placeholder="Chủ đề"
            class="mt-4 p-2 bg-gray-200 dark:bg-gray-800 focus:bg-transparent outline-none"
          />
        </div>
        <div class="w-1/2 ml-4 flex flex-col" data-aos="fade-up">
          <textarea
            placeholder="Nội dung"
            class="p-2 h-full bg-gray-200 dark:bg-gray-800 focus:bg-transparent outline-none resize-none"
          ></textarea>
        </div>
      </div>
      <div class="mt-8 flex items-center justify-center" data-aos="fade-up">
        <button
          type="submit"
          class="py-2 px-4 rounded-md bg-blue-500 text-white"
        >
          Liên hệ
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import aosMixin from '@/mixins/aos'

@Component({
  mixins: [aosMixin],
})
export default class Contact extends Vue {}
</script>
