<template>
  <section class="my-12 mx-6">
    <div class="text-center" data-aos="fade-up">
      <h4 class="text-xl font-bold dark:text-white">Những gì tôi có thể làm</h4>
      <div class="h-1 mt-2 bg-blue-500 mx-auto w-1/12"></div>
    </div>
    <div class="mt-12 grid grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-8 dark:text-white">
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="bg-gray-200 dark:bg-gray-800 rounded-md py-4"
        data-aos="fade-up"
      >
        <div class="w-16 h-16 mb-4 mx-auto text-center bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded-full">
          <i :class="'fa-solid ' + skill.icon" class="text-xl p-4"></i>
        </div>
        <div class="mt-4 text-center">
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
        'Thiết kế logo, icon và branding',
        'Lập trình tương thích (responsive) cho nhiều loại màn hình'
      ],
    },
    {
      icon: 'fa-code',
      set: [
        'Xây dựng và quản lý cơ sở dữ liệu (database)',
        'Lập trình API tương tác với dữ liệu',
        'Thiết lập môi trường cho ứng dụng bên thứ 3'
      ],
    },
    {
      icon: 'fa-diagram-project',
      set: [
        'Phân tích use case theo vai trò người dùng',
        'Thiết kế luồng dữ liệu (data flow)',
        'Phân tích và tối ưu hoá tìm kiếm (SEO)',
      ],
    },
    {
      icon: 'fa-briefcase',
      set: [
        'Quản lý dự án IT theo phương pháp Agile',
        'Quản trị hệ thống và DevOps cơ bản',
        'Quản lý chất lượng và thiết kế kiểm thử (test design)',
      ],
    }
  ]
}
</script>
