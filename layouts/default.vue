<template>
  <main class="h-screen dark:bg-black">
    <Header />
    <div class="flex">
      <SideMenu />
      <Nuxt style="height: calc(100vh - 5rem)" />
    </div>
  </main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {}
</script>
