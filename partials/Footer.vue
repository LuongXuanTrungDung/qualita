<template>
  <footer class="dark:bg-black dark:text-white">
    <nav class="p-6 flex justify-center items-center">
      <ul class="mr-auto flex justify-center items-center">
        <li v-for="info, index in infos" :key="index" :class="[index == 0 ? 'mr-4' : 'mx-4']">
          <i :class="'mr-2 text-xl fa-solid ' + info.icon"></i>
          <a class="hover:text-blue-500 dark:hover:text-blue-500 dark:text-white" href="" >{{info.details}}</a>
        </li>
      </ul>
      <li class="ml-auto">
        <span class="text-sm text-gray-500">MIT @2022</span>
      </li>
    </nav>
  </footer>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {
  infos = [
    { details: 'luongxuantrungdung211@gmail.com', icon: 'fa-envelope' },
    { details: '(+84) 093-436-8160', icon: 'fa-square-phone' },
  ]
}
</script>
