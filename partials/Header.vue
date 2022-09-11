<template>
  <header class="dark:bg-black dark:text-white">
    <nav class="flex text-center">
      <li class="p-6 mr-auto">
        <button @click="$store.commit('toggleSideMenu')">
          <i class="fa-solid fa-bars text-xl"></i>
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
  </header>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  toggleDarkMode() {
    if (this.$colorMode.preference !== 'dark') {
      this.$colorMode.preference = 'dark'
    } else {
      this.$colorMode.preference = 'light'
    }
  }
}
</script>
