<template>
  <main>
    <Header @toggleSideMenu="(status) => (sideMenuStatus = status)" />
    <div class="flex">
      <SideMenu
        :is-shown="sideMenuStatus"
        @toggleSideMenu="(status) => (sideMenuStatus = status)"
      />
      <Nuxt />
    </div>
  </main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  sideMenuStatus = false
}
</script>
