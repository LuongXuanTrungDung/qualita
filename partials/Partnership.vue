<template>
  <section class="my-12">
    <div class="text-center" data-aos="fade-up">
      <h4 class="text-xl font-bold dark:text-white">Các đối tác của tôi</h4>
      <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
    </div>
    <div
      class="mt-12 grid grid-rows-2 md:grid-rows-1 lg:grid-cols-4 grid-cols-2 gap-4 dark:bg-gray-200"
      data-aos="fade-up"
    >
      <div v-for="(partner, index) in partnerImages" :key="index" class="h-24 p-4 mx-auto">
        <img :src="partner.image" :alt="partner.name" class="h-full" />
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import partners from '@/static/data/partners.json'
import aosMixin from '@/mixins/aos'

@Component({
  mixins: [aosMixin],
})
export default class Partnership extends Vue {
  partnerImages = partners
}
</script>
