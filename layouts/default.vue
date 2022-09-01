<template>
  <main>
    <Header />
    <div class="flex">
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
