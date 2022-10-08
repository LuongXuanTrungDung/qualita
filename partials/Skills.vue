<template>
  <section class="my-12 mx-6">
    <div class="text-center" data-aos="fade-up">
      <h4 class="text-xl font-bold dark:text-white">Những gì tôi có thể làm</h4>
      <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
    </div>
    <div class="mt-12 grid grid-rows-2 grid-cols-2 gap-6 dark:text-white">
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="bg-gray-200 dark:bg-gray-800 flex p-2"
        data-aos="fade-up"
      >
        <div class="flex items-center justify-center mr-2">
          <i :class="'fa-solid ' + skill.icon" class="text-xl p-4"></i>
        </div>
        <div class="ml-2">
          <p v-for="(text, textKey) in skill.set" :key="textKey" class="my-2">
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Skills extends Vue {
  skills = [
    {
      icon: 'fa-window-restore',
      set: [
        'Thiết kế mockup và UX/UI cho website',
        'Xác định use case cho các vai trò người dùng khác nhau',
      ],
    },
    {
      icon: 'fa-database',
      set: [
        'Thiết kế luồng dữ liệu (data flow)',
        'Xây dựng cơ sở dữ liệu (database)',
      ],
    },
    {
      icon: 'fa-code',
      set: [
        'Lập trình MVC và ứng dụng bên thứ 3',
        'Viết API truyền và xử lý dữ liệu',
      ],
    },
    {
      icon: 'fa-object-group',
      set: [
        'Thiết kế logo, icon và branding',
        'Phân tích và tối ưu hoá tìm kiếm (SEO)',
      ],
    },
  ]
}
</script>
