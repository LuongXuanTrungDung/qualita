<template>
  <section class="my-12 mx-6">
    <div class="w-full relative flex flex-col">
      <div class="text-center mt-12" data-aos="fade-up">
        <h4 class="text-xl font-bold dark:text-white">
          Những gì tôi đã làm được
        </h4>
        <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
      </div>
      <div v-for="slide, index in projectSlides" :key="index" :class="'mt-12 ' + [currentSlide != index ? 'hidden' : '']">
        <img :src="slide.images" :alt="slide.title" class="w-2/3 mx-auto mb-4" data-aos="fade-up" />
        <div class="w-full mt-4" data-aos="fade-up">
          <div class="w-full mt-12 flex items-center justify-center" data-aos="fade-up">
            <button
              class="dark:text-white p-4 mr-6 text-lg rounded-r-md"
              @click="prevSlide()"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button
              v-for="project, projIndex in projectSlides" :key="projIndex" :class="'w-3 h-3 rounded-full mx-2 ' + [projIndex == currentSlide ? 'bg-blue-500' : 'bg-gray-500']"
              @click="currentSlide = index"
            ></button>
            <button
              class="ml-6 p-4 dark:text-white text-lg rounded-l-md"
              @click="nextSlide()"
            >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          </div>
          <h2 class="text-2xl dark:text-white mb-4">{{ slide.title }}</h2>
          <p class="my-4 dark:text-white text-justify">{{ slide.text }}</p>
          <p class="my-4">
            <span class="dark:text-white mr-2">Vai trò:</span>
            <span v-for="(role, roleIndex) in slide.roles" :key="roleIndex" class="text-blue-500 mx-2">{{ role }}</span>
          </p>
          <div class="break-all mt-4">
            <span v-for="(tag, tagIndex) in slide.tags" :key="tagIndex" :class="'rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white py-1 px-2 ' + [tagIndex == 0 ? 'mr-2' : 'mx-2']">{{
              tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import projects from '@/static/data/projects.json'
import aosMixin from '@/mixins/aos'

@Component({
  mixins: [aosMixin],
})
export default class Carousel extends Vue {
  projectSlides = projects
  currentSlide = 0

  prevSlide() {
    if (this.currentSlide - 1 < 0) {
      this.currentSlide = this.projectSlides.length - 1
    } else {
      this.currentSlide--
    }
  }

  nextSlide() {
    if (this.currentSlide + 1 > this.projectSlides.length - 1) {
      this.currentSlide = 0
    } else {
      this.currentSlide++
    }
  }
}
</script>
