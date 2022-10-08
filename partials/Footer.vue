<template>
  <header class="dark:bg-black dark:text-white">
    <nav class="p-6 flex text-center">
      <li class="ml-auto">
        <span class="text-sm text-gray-500">MIT @2022</span>
      </li>
    </nav>
  </header>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
