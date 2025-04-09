<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar superior -->
    <Navbar />

    <div class="flex flex-1">
      <!-- Sidebar -->
      <Sidebar class="w-72" />

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