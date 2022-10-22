<template>
  <main class="dark:bg-black h-screen mx-auto flex items-center justify-center" data-aos="fade-up">
    <section class="text-center">
      <i class="fa-solid fa-circle-xmark text-6xl text-gray-800"></i>
      <p v-if="error.statusCode === 404" class="mt-12 mb-2 dark:text-white text-2xl">Không tìm thấy trang mà bạn yêu cầu</p>
      <p class="mt-2 text-xl dark:text-white">Bạn có muốn quay về
        <NuxtLink to="/" class="text-blue-500">Trang chủ</NuxtLink>
         ?
      </p>
    </section>
  </main>
</template>

<script>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import aosMixin from '@/mixins/aos'

@Component({
  layout: 'error',
  mixins: [aosMixin],
})
export default class ErrorLayout extends Vue {
  @Prop() error
}
</script>
