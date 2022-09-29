<template>
  <section class="my-12 mx-6">
    <div class="w-full relative">
      <div class="text-center mb-12" data-aos="fade-up">
        <h4 class="text-xl font-bold dark:text-white">Những gì tôi đã làm được</h4>
        <div class="h-1 mt-2 bg-main mx-auto w-1/12"></div>
      </div>
      <div v-for="slide, index in carouselData" :key="index" class="mt-12">
        <div v-if="currentSlide == index" class="flex" style="height: 21.5rem;">
          <button
            class="dark:text-white mr-6 text-lg rounded-r-md"
            @click="prevSlide()">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <img :src="slide.images" :alt="slide.title" class="w-1/2 mx-6" data-aos="fade-right">
          <div class="w-1/2 mx-6" data-aos="fade-left">
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
          <button
            class="ml-6 p-4 dark:text-white text-lg rounded-l-md"
            @click="nextSlide()">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div class="w-full mt-12 flex items-center justify-center">
        <button v-for="slide, index in carouselData" :key="index" :class="[index == currentSlide ? 'w-3 h-3 rounded-full bg-main mx-2' : 'w-3 h-3 rounded-full bg-gray-500 mx-2']" @click="currentSlide=index"></button>
      </div>
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
