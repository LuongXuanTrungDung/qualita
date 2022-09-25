<template>
  <main class="dark:bg-black">
    <Header />
    <div class="flex h-full">
      <SideMenu />
      <Nuxt />
    </div>
  </main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {}
</script>
