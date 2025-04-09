<template>
  <header class="bg-white border-b-4 border-secondary">
    <div class="mx-auto">
      <div class="flex h-16 relative">
        <!-- Logo -->
        <div class="flex justify-center items-center w-72 gap-x-2 border">
          <button class="bg-white w-8 h-8 shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] flex justify-center items-center rounded active:ring-1">
            <UikitIcon name="menu" class="text-2xl" />
          </button>
          <img src="/assets/images/logo.png" alt="logo" class="w-28">
        </div>

        <!-- Desktop nav -->
        <div class="flex-1 flex items-center space-x-6 ">
          <h1 class="uppercase text-primary mx-8">Titulo de la sección</h1>
        </div>

        <!-- Botón de login -->
        <div class="relative flex">
          <div class="absolute left-[-64px] top-0 h-0 w-0 border-t-[32px] border-b-[32px] border-r-[32px] border-l-[32px] border-primary border-l-transparent border-b-transparent "></div>
          <div class="flex items-center bg-primary px-6">
            <div class="flex gap-x-2">
              <UikitIconNotification name="favorite"></UikitIconNotification>
              <UikitIconNotification name="notification"></UikitIconNotification>
              <UikitIconNotification name="configuration"></UikitIconNotification>
            </div>

            <div class="flex rounded-full bg-white ps-2 pe-8 ml-4 items-center">
              <div class="ms-1 me-3">
                <UikitIcon name="user-solid" class="text-3xl" />
              </div>
              <div class="flex flex-col">
                <div class="text-lg">Hello, Camila</div>
                <div class="text-[11px]">Your conected from Monterrey</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
