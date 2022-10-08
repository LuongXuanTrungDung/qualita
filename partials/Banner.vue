<template>
  <section class="my-12 h-1/2">
    <div
      style="
        height: 32rem;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.65)
          ),
          url('/home-parallax.jpg');
      "
      class="w-full bg-fixed bg-center bg-no-repeat bg-cover relative"
    >
      <div class="px-6 my-1/2 h-full flex justify-center items-center">
        <div class="text-center text-white">
          <img
            src="/portrait.jpg"
            class="w-40 h-40 mb-4 mx-auto rounded-full"
          />
          <h1 class="my-4 text-3xl font-bold" data-aos="fade-up">
            Xin chào, tôi là Dũng
          </h1>
          <p class="my-4" data-aos="fade-up">
            Tôi là một nhà phát triển web full-stack đến từ Thành phố Hồ Chí
            Minh, Việt Nam, với mong muốn tạo ra các sản phẩm được thiết kế khoa
            học và có tính nghệ thuật, để mang đến những trải nghiệm tiện lợi và
            hữu ích nhất cho người sử dụng.
          </p>
          <NuxtLink
            data-aos="fade-up"
            to="/about"
            class="mt-4 rounded-md py-2 px-4 mx-auto bg-blue-500 hover:text-white hover:bg-black"
            >Tìm hiểu thêm</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import aosMixin from '@/mixins/aos'

@Component({
  mixins: [aosMixin],
})
export default class Banner extends Vue {}
</script>
