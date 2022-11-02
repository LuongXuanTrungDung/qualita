<template>
  <section class="my-12 mx-6 flex flex-col text-center">
    <div class="bg-gray-200 dark:bg-gray-800 w-52 h-52 rounded-full mb-6 flex items-center justify-center mx-auto" data-aos="fade-up">
      <img src="/portrait.jpg" class="w-40 h-40 rounded-full" />
    </div>
    <div class="w-2/3 mx-auto mt-6 dark:text-white">
      <h1 class="mb-4 text-3xl font-bold" data-aos="fade-up">
        Xin chào, tôi là <span class="text-blue-500">Dũng</span>
      </h1>
      <p class="my-4" data-aos="fade-up">
        Tôi là một nhà phát triển web full-stack đến từ Thành phố Hồ Chí
        Minh, Việt Nam, với mong muốn tạo ra các sản phẩm được thiết kế khoa
        học và có tính nghệ thuật, để mang đến những trải nghiệm tiện lợi và
        hữu ích nhất cho người sử dụng.
      </p>
    </div>
    <div class="mt-4 dark:text-white" data-aos="fade-up">
      <p class="mb-4">Các đối tác của tôi:</p>
      <div class="mt-4 dark:bg-gray-200 grid grid-rows-2 lg:grid-rows-1 grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
        <div v-for="(partner, index) in partnerImages" :key="index" class="h-24 p-4 mx-auto">
          <img :src="partner.image" :alt="partner.name" class="h-full" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import aosMixin from '@/mixins/aos'
import partners from '@/static/data/partners.json'

@Component({
  mixins: [aosMixin],
})
export default class Banner extends Vue {
  partnerImages = partners
}
</script>
