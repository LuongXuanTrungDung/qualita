<template>
  <div class="flex flex-col">
    <Banner />
    <Carousel />
    <Contact />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {}
</script>
