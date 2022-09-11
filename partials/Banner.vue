<template>
  <section
    style="
      background-image: linear-gradient(
          rgba(0, 0, 0, 0.65),
          rgba(0, 0, 0, 0.65)
        ),
        url('/home-parallax.jpg');
    "
    class="w-full h-full bg-fixed bg-center bg-no-repeat bg-cover relative"
  >
    <div class="px-6 my-1/2 h-full flex justify-center items-center">
      <div class="text-center dark:text-white">
        <img src="/portrait.jpg" class="w-40 h-40 my-4 mx-auto rounded-full" />
        <h1 class="my-4 text-3xl font-bold">Xin chào, tôi là Dũng</h1>
        <p class="my-4">
          Tôi là một nhà phát triển web full-stack đến từ Thành phố Hồ Chí Minh,
          Việt Nam, với mong muốn tạo ra các sản phẩm được thiết kế khoa học và
          có tính nghệ thuật, để mang đến những trải nghiệm tiện lợi và hữu ích
          nhất cho người sử dụng.
        </p>
        <NuxtLink
          to="/about"
          class="my-4 rounded-md py-2 px-4 mx-auto bg-main hover:text-white hover:bg-black"
          >Tìm hiểu thêm</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Banner extends Vue {}
</script>
