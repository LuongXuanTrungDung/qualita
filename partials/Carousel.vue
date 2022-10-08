<template>
  <section class="my-12 mx-6">
    <div class="w-full relative">
      <div class="text-center mb-12" data-aos="fade-up">
        <h4 class="text-xl font-bold dark:text-white">
          Những gì tôi đã làm được
        </h4>
        <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
      </div>
      <div v-for="(slide, index) in projectSlides" :key="index" class="mt-12">
        <div v-if="currentSlide == index" class="flex" style="height: 21.5rem">
          <button
            class="dark:text-white mr-6 text-lg rounded-r-md"
            @click="prevSlide()"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <img
            :src="slide.images"
            :alt="slide.title"
            class="w-1/2 mx-6"
            data-aos="fade-right"
          />
          <div class="w-1/2 mx-6" data-aos="fade-left">
            <h2 class="text-2xl dark:text-white mb-4">{{ slide.title }}</h2>
            <p class="my-4 dark:text-white text-justify">{{ slide.text }}</p>
            <p class="my-4 text-justify">
              <span class="dark:text-white mr-2">Vai trò:</span>
              <span
                v-for="(role, roleIndex) in slide.roles"
                :key="roleIndex"
                class="text-main mx-2"
                >{{ role }}</span
              >
            </p>
            <p class="mt-4 text-main text-justify">
              <span
                v-for="(tag, tagIndex) in slide.tags"
                :key="tagIndex"
                :class="[
                  tagIndex == 0
                    ? 'rounded-md bg-blue-500 text-white py-1 px-2 mr-2'
                    : 'rounded-md bg-blue-500 text-white py-1 px-2 mx-2',
                ]"
                >{{ tag }}</span
              >
            </p>
          </div>
          <button
            class="ml-6 p-4 dark:text-white text-lg rounded-l-md"
            @click="nextSlide()"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div class="w-full my-12 flex items-center justify-center">
        <button
          v-for="(slide, index) in projectSlides"
          :key="index"
          :class="[
            index == currentSlide
              ? 'w-3 h-3 rounded-full bg-blue-500 mx-2'
              : 'w-3 h-3 rounded-full bg-gray-500 mx-2',
          ]"
          @click="currentSlide = index"
        ></button>
      </div>
    </div>
    <div class="my-12 text-center" data-aos="fade-up">
      <h4 class="text-xl font-bold dark:text-white">Các đối tác của tôi</h4>
      <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
    </div>
    <div
      class="mt-12 flex items-center justify-center dark:bg-gray-200"
      data-aos="fade-up"
    >
      <div
        v-for="(partner, index) in partnerImages"
        :key="index"
        class="h-24 mx-6 p-4"
      >
        <img :src="partner.image" :alt="partner.name" class="h-full" />
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import projects from '@/static/data/projects.json'
import partners from '@/static/data/partners.json'
import aosMixin from '@/mixins/aos'

@Component({
  mixins: [aosMixin],
})
export default class Carousel extends Vue {
  projectSlides = projects
  partnerImages = partners
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
