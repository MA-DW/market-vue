<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
const props = defineProps({
  showOverlay: Boolean,
})
const emit = defineEmits(['update:showOverlay'])
const toggleCollapse = inject('toggleCollapse') as () => void;

const isOpen = ref(false)
const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

watch(isOpen, (val) => {
  emit('update:showOverlay', val)
})

const isOpenNotification = ref(false)
const dropdownNotificationRef = ref(null)

onClickOutside(dropdownNotificationRef, () => {
  isOpenNotification.value = false
})

watch(isOpenNotification, (val) => {
  emit('update:showOverlay', val)
})

</script>
<template>
  <header class="bg-white border-b-4 border-secondary">
    <div class="mx-auto">
      <div class="flex h-16 relative">
        <!-- Logo -->
        <div class="flex justify-center items-center w-72 gap-x-2 border">
          <button @click="toggleCollapse" class="bg-white w-8 h-8 shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] flex justify-center items-center rounded active:ring-1">
            <UikitIcon name="menu" class="text-2xl" />
          </button>
          <img src="/assets/images/logo.png" alt="logo" class="w-28">
        </div>

        <!-- Desktop nav -->
        <div class="hidden flex-1 lg:flex items-center space-x-6 ">
          <h1 class="uppercase text-primary mx-8">Titulo de la sección</h1>
        </div>

        <!-- Botón de login -->
        <div class="relative flex">
          <div class="absolute left-[-64px] top-0 h-0 w-0 border-t-[32px] border-b-[32px] border-r-[32px] border-l-[32px] border-primary border-l-transparent border-b-transparent "></div>
          <div class="flex items-center bg-primary px-6">
            <div class="flex gap-x-2 relative" ref="dropdownNotificationRef">
              <UikitIconNotification @click="isOpenNotification = !isOpenNotification" name="favorite"></UikitIconNotification>
              <UikitIconNotification @click="isOpenNotification = !isOpenNotification" name="notification"></UikitIconNotification>
              <UikitIconNotification @click="isOpenNotification = !isOpenNotification" name="configuration"></UikitIconNotification>

              <ul v-if="isOpenNotification" class="absolute block top-12 right-0 bg-white w-80 rounded shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] p-0 text-lg z-50">
                <li class="flex rounded-sm px-4 py-3 border-b">
                  <div class="flex-1 mr-2 font-bold">NOTIFICATIONS</div><UikitIcon name="configuration" />
                </li>
                <li class="flex rounded-sm p-2 gap-2 hover:!bg-oscuro-100">
                  <div>
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5 8.27832C11.5 7.60882 12.007 7.05957 12.625 7.05957H13.375C13.993 7.05957 14.5 7.60882 14.5 8.27832V9.09082C14.5 9.76032 13.993 10.3096 13.375 10.3096H12.625C12.327 10.3083 12.0415 10.1795 11.8308 9.95119C11.6201 9.72291 11.5012 9.41366 11.5 9.09082V8.27832ZM16 20.0596H10V18.4346H11.5V13.5596H10V11.9346H14.5V18.4346H16V20.0596Z" fill="#67707A"/>
                      <path d="M13 0.0595703C9.55219 0.0595703 6.24558 1.42921 3.80761 3.86718C1.36964 6.30516 0 9.61176 0 13.0596C0 16.5074 1.36964 19.814 3.80761 22.252C6.24558 24.6899 9.55219 26.0596 13 26.0596C16.4478 26.0596 19.7544 24.6899 22.1924 22.252C24.6304 19.814 26 16.5074 26 13.0596C26 9.61176 24.6304 6.30516 22.1924 3.86718C19.7544 1.42921 16.4478 0.0595703 13 0.0595703ZM13 23.6221C10.1987 23.6221 7.51204 22.5092 5.53118 20.5284C3.55033 18.5475 2.4375 15.8609 2.4375 13.0596C2.4375 10.2582 3.55033 7.57161 5.53118 5.59075C7.51204 3.6099 10.1987 2.49707 13 2.49707C15.8013 2.49707 18.488 3.6099 20.4688 5.59075C22.4497 7.57161 23.5625 10.2582 23.5625 13.0596C23.5625 15.8609 22.4497 18.5475 20.4688 20.5284C18.488 22.5092 15.8013 23.6221 13 23.6221Z" fill="#67707A"/>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-oscuro-300 text-[10px]">2 MIN AGO</div>
                    <div class="font-bold">Information Notification Title</div>
                    <div class="text-oscuro-300 line-clamp-2 text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia amet maiores architecto voluptas officiis...</div>
                  </div>
                  <div>x</div>
                </li>
                <li class="flex rounded-sm p-2 gap-2 hover:!bg-oscuro-100 border-l-4 border-l-error" >
                  <div>
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.61502 20.4445C7.69014 22.479 10.1518 23.4962 13 23.4962C15.8482 23.4962 18.2895 22.479 20.3239 20.4445C22.3991 18.3694 23.4366 15.9078 23.4366 13.0596C23.4366 10.2114 22.3991 7.77006 20.3239 5.73563C18.2895 3.66051 15.8482 2.62295 13 2.62295C10.1518 2.62295 7.69014 3.66051 5.61502 5.73563C3.58059 7.77006 2.56338 10.2114 2.56338 13.0596C2.56338 15.9078 3.58059 18.3694 5.61502 20.4445ZM3.78404 3.90464C6.34742 1.34126 9.4194 0.0595703 13 0.0595703C16.5806 0.0595703 19.6322 1.34126 22.1549 3.90464C24.7183 6.42733 26 9.47898 26 13.0596C26 16.6402 24.7183 19.7122 22.1549 22.2755C19.6322 24.7982 16.5806 26.0596 13 26.0596C9.4194 26.0596 6.34742 24.7982 3.78404 22.2755C1.26135 19.7122 0 16.6402 0 13.0596C0 9.47898 1.26135 6.42733 3.78404 3.90464ZM11.7183 6.52905H14.2817V14.3413H11.7183V6.52905ZM11.7183 16.9657H14.2817V19.5901H11.7183V16.9657Z" fill="#C91038"/>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-oscuro-300 text-[10px]">2 MIN AGO</div>
                    <div class="font-bold">Information Notification Title</div>
                    <div class="text-oscuro-300 line-clamp-2 text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia amet maiores architecto voluptas officiis...</div>
                  </div>
                  <div>x</div>
                </li>
                <li class="flex rounded-sm p-2 gap-2 hover:!bg-oscuro-100 border-l-4 border-l-success">
                  <div>
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.9235 18.157L5.90909 13.1414L7.58018 11.4703L10.9235 14.8125L17.6079 8.12695L19.2802 9.79923L10.9235 18.157Z" fill="#179912"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.0586C0 5.87905 5.82045 0.0585938 13 0.0585938C20.1795 0.0585938 26 5.87905 26 13.0586C26 20.2381 20.1795 26.0586 13 26.0586C5.82045 26.0586 0 20.2381 0 13.0586ZM13 23.695C11.6032 23.695 10.2201 23.4198 8.92964 22.8853C7.63918 22.3508 6.46663 21.5673 5.47895 20.5796C4.49128 19.592 3.70781 18.4194 3.17328 17.129C2.63875 15.8385 2.36364 14.4554 2.36364 13.0586C2.36364 11.6618 2.63875 10.2787 3.17328 8.98823C3.70781 7.69777 4.49128 6.52523 5.47895 5.53755C6.46663 4.54987 7.63918 3.7664 8.92964 3.23187C10.2201 2.69735 11.6032 2.42223 13 2.42223C15.8209 2.42223 18.5263 3.54284 20.521 5.53755C22.5157 7.53225 23.6364 10.2377 23.6364 13.0586C23.6364 15.8795 22.5157 18.5849 20.521 20.5796C18.5263 22.5743 15.8209 23.695 13 23.695Z" fill="#179912"/>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-oscuro-300 text-[10px]">2 MIN AGO</div>
                    <div class="font-bold">Information Notification Title</div>
                    <div class="text-oscuro-300 line-clamp-2 text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia amet maiores architecto voluptas officiis...</div>
                  </div>
                  <div>x</div>
                </li>
              </ul>
            </div>

            <div class="flex rounded-full bg-white ps-2 pe-8 ml-4 items-center relative active:ring-2 cursor-pointer" tabindex="0" ref="dropdownRef">
              <div class="ms-1 me-3">
                <UikitIcon name="user-solid" class="text-3xl" />
              </div>
              <div class="flex flex-col" @click="isOpen = !isOpen">
                <div class="text-lg">Hello, Camila</div>
                <div class="text-[11px]">Your conected from Monterrey</div>
              </div>

              <ul v-if="isOpen" class="absolute block top-12 right-0 bg-white w-44 rounded shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] py-3 px-4 text-lg z-50">
                <li class="flex rounded-sm p-1 hover:!bg-oscuro-100">
                  <UikitIcon name="user" /><div class="flex-1 ml-2">MY PANEL</div>
                </li>
                <li class="flex rounded-sm p-1 hover:!bg-oscuro-100">
                  <UikitIcon name="signout" /><div class="flex-1 ml-2">SIGN OUT</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>
