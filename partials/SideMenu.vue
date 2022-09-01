<template>
  <aside :class="[isShown ? menuShown : menuHidden]">
    <nav class="flex flex-col">
      <li class="p-4 mb-16 mx-1">
        <button @click="$store.commit('toggleSideMenu')">
          <i class="fas fa-times text-xl"></i>
        </button>
      </li>
      <nav class="flex p-4">
        <ul class="flex flex-col mr-8">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[index == 0 ? 'mb-4' : 'my-4']"
          >
            <NuxtLink :to="tab.url" class="hover:text-main">
              <h3 class="text-2xl">{{ tab.text }}</h3>
            </NuxtLink>
          </li>
        </ul>
        <ul class="flex flex-col ml-8">
          <li
            v-for="(i, index) in info"
            :key="index"
            :class="[index == 0 ? 'mb-3' : 'my-3']"
          >
            <h3 class="text-2xl mb-2">{{ i.type }}</h3>
            <a class="ml-4 text-lg hover:text-main" href="">{{ i.details }}</a>
          </li>
          <li class="my-4 flex">
            <a
              v-for="(soc, index) in socialMedia"
              :key="index"
              :class="[
                index == 0 ? 'mr-4 hover:text-main' : 'mx-4 hover:text-main',
              ]"
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class SideMenu extends Vue {
  tabs = [
    { text: 'Trang chủ', url: '/' },
    { text: 'Giới thiệu', url: 'about' },
    { text: 'Chuyên môn', url: 'expertise' },
    // { text: 'Tin tức', url: 'news' },
    { text: 'Sản phẩm', url: 'works' },
    { text: 'Liên hệ', url: 'contact' },
  ]

  info = [
    { type: 'Email', details: 'luongxuantrungdung211@gmail.com' },
    { type: 'Số điện thoại', details: '(+84) 093-436-8160' },
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
    return this.$store.state.sideMenuShown;
  }
}
</script>
