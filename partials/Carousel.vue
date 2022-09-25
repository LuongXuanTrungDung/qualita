<template>
  <section class="my-12 mx-18">
    <div class="w-full relative">
      <div v-for="slide, index in carouselData" :key="index">
        <div v-if="currentSlide == index" class="flex" style="height: 20rem;">
          <img :src="slide.images" :alt="slide.title" class="w-1/2 mr-4">
          <div class="w-1/2 ml-4">
            <h2 class="text-2xl dark:text-white mb-4">{{slide.title}}</h2>
            <p class="my-4 dark:text-white text-justify">{{slide.text}}</p>
            <p class="my-4 text-justify">
              <span class="dark:text-white mr-2">Vai trò:</span>
              <span v-for="role, roleIndex in slide.roles" :key="roleIndex" class="text-main mx-2">{{role}}</span>
            </p>
            <p class="mt-4 text-main text-justify">
              <span v-for="tag, tagIndex in slide.tags" :key="tagIndex" :class="[tagIndex == 0 ? 'rounded-md bg-main text-white py-1 px-2 mr-2': 'rounded-md bg-main text-white py-1 px-2 mx-2'] ">{{tag}}</span>
            </p>
          </div>
        </div>
      </div>
      <button
        class="absolute top-1/2 p-4 dark:text-white text-lg rounded-r-md hover:bg-white dark:hover:bg-black"
        @click="prevSlide()">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button
        class="absolute top-1/2 right-0 p-4 dark:text-white text-lg rounded-l-md hover:bg-white hover:dark:bg-black"
        @click="nextSlide()">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import data from '@/static/data/projects.json'
import aosMixin from '@/mixins/aos'

@Component({
  mixins: [aosMixin]
})
export default class Carousel extends Vue {
  carouselData = data
  currentSlide = 0

  prevSlide() {
    if (this.currentSlide - 1 < 0) {
      this.currentSlide = this.carouselData.length - 1
    } else {
      this.currentSlide--
    }
  }

  nextSlide() {
    if (this.currentSlide + 1 > this.carouselData.length - 1) {
      this.currentSlide = 0
    } else {
      this.currentSlide++
    }
  }
}
</script>
