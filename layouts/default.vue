<script lang="ts" setup>
const isCollapsed = ref(false)
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
provide('isCollapsed', isCollapsed);
provide('toggleCollapse', toggleCollapse);

const showOverlay = ref(false)
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar superior -->
    <Navbar v-model:showOverlay="showOverlay" />

    <div class="flex flex-1 relative">
      <div
        v-if="showOverlay"
        class="absolute inset-0 bg-black/40 z-40 cursor-default"
      ></div>
      <!-- Sidebar -->
      <Sidebar />

      <!-- Contenido principal -->
      <div class="flex flex-1 flex-col">
        <main class="flex-1 p-6 relative ">
          <slot />
          <div
            class="absolute bottom-0 left-0 w-full h-1/3 bg-[url('/assets/images/background.png')] bg-no-repeat bg-cover bg-center pointer-events-none"
          ></div>
        </main>
        <!-- Footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>