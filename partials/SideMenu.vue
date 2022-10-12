<template>
  <aside :class="[isShown ? menuShown : menuHidden]">
    <nav class="flex flex-col">
      <li class="p-6 mb-16 mx-1">
        <button @click="$store.commit('toggleSideMenu')">
          <i class="fas fa-times text-xl"></i>
        </button>
      </li>
      <nav class="flex flex-col md:flex-row p-6">
        <ul class="flex flex-col md:mr-8 mr-0 mb-8 md:mb-0">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[index == 0 ? 'mb-4' : 'my-4']"
          >
            <NuxtLink :to="tab.url" class="hover:text-blue-500">
              <h3 class="text-2xl">{{ tab.text }}</h3>
            </NuxtLink>
          </li>
        </ul>
        <ul class="flex flex-col md:ml-8 ml-0 mt-8 md:mt-0">
          <li
            v-for="(i, index) in info"
            :key="index"
            :class="[index == 0 ? 'mb-3' : 'my-3']"
          >
            <h3 class="text-2xl mb-2">{{ i.type }}</h3>
            <a class="ml-4 text-lg hover:text-blue-500" href="">{{ i.details }}</a>
          </li>
          <li class="my-4 flex">
            <a
              v-for="(soc, index) in socialMedia"
              :key="index"
              :class="'hover:text-blue-500 ' + [index == 0 ? 'mr-4' : 'mx-4']"
              :href="soc.link"
            >
              <i :class="'fa-brands text-2xl ' + soc.icon"></i>
            </a>
          </li>
        </ul>
      </nav>
    </nav>
  </aside>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SideMenu extends Vue {
  tabs = [
    { text: 'Trang chủ', url: '/' },
    { text: 'Giới thiệu', url: 'about' },
    // { text: 'Blog', url: 'blog' },
    { text: 'Sản phẩm', url: 'works' },
    { text: 'Liên hệ', url: 'contact' },
  ]

  info = [
    { type: 'Email', details: 'luongxuantrungdung211@gmail.com' },
    { type: 'Số điện thoại (Zalo và MoMo)', details: '(+84) 093-436-8160' },
  ]

  socialMedia = [
    {
      icon: 'fa-linkedin',
      link: 'https://www.linkedin.com/in/adrian-luong-3a3a99202/',
    },
    { icon: 'fa-github', link: 'https://github.com/LuongXuanTrungDung' },
  ]

  menuHidden =
    'h-full bg-transparent text-white fixed top-0 left-0 z-1 overflow-hidden w-0'

  menuShown =
    'h-full bg-gray-900 text-white fixed top-0 left-0 z-1 overflow-hidden w-full'

  get isShown() {
    return this.$store.state.sideMenuShown
  }
}
</script>
