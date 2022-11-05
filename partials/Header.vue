<template>
  <header
    class="dark:bg-black dark:text-white sticky top-0 z-1 dark:bg-black bg-white"
  >
    <nav class="flex text-center">
      <li class="p-6 mr-auto">
        <!-- <button @click="$store.commit('toggleSideMenu')">
          <i class="fa-solid fa-bars text-xl"></i>
        </button> -->
        <button @click="isDroppedDown=!isDroppedDown">
          <i v-if="isDroppedDown==false" class="fa-solid fa-globe text-xl w-6"></i>
          <i v-else class="fa-solid fa-times text-xl w-6"></i>
        </button>
      </li>
      <li class="p-6 mx-auto">
        <NuxtLink to="/">
          <img
            v-if="$colorMode.value === 'dark'"
            src="Logo (Dark).svg"
            class="w-8 h-8"
          />
          <img v-else src="Logo (Light).svg" class="w-8 h-8" />
        </NuxtLink>
      </li>
      <li class="p-6 ml-auto">
        <button class="w-8 h-8" @click="toggleDarkMode">
          <i
            v-if="$colorMode.value === 'dark'"
            class="fa-solid fa-moon text-xl"
          ></i>
          <i v-else class="fa-solid fa-sun text-xl"></i>
        </button>
      </li>
    </nav>
    <ul v-if="isDroppedDown" class="absolute top-14 left-6 divide-y divide-dashed divide-white dark:text-white z-1 bg-gray-200 dark:bg-gray-800">
      <li v-for="locale, index in showLocales" :key="index" class="hover:text-blue-500 px-4 py-2">
        <nuxt-link :to="localePath('index', locale.code)">{{locale.name}}</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  isDroppedDown = false

  get showLocales() {
    return this.$i18n.locales;
  }

  toggleDarkMode() {
    if (this.$colorMode.preference !== 'dark') {
      this.$colorMode.preference = 'dark'
    } else {
      this.$colorMode.preference = 'light'
    }
  }
}
</script>
