<template>
  <form @submit.prevent="handleLogin" class="space-y-4 max-w-md mx-auto mt-10">
    <input v-model="username" type="text" placeholder="Usuario" class="border p-2 w-full" />
    <input v-model="password" type="password" placeholder="Contraseña" class="border p-2 w-full" />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2">Iniciar Sesión</button>
  </form>
</template>
<script setup lang="ts">
import chroma from 'chroma-js'
import { useApi } from '~/composables/useApi'
import { useAuthStore } from '~/stores/auth'
definePageMeta({
  layout: false
})
const username = ref('')
const password = ref('')

const auth = useAuthStore()
const colorStore = useColorStore()
const router = useRouter()
const { fetchWithAuth } = useApi()

const handleLogin = async () => {
  try {
    const response: any = await fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: { user_name: username.value, password: password.value }
    })

    auth.login(response.data, response.access_token)
    const primary = chroma(response.data.company.primary_color).rgb()
    const secondary = chroma(response.data.company.secondary_color).rgb()
    colorStore.setColors(primary.toString(), secondary.toString())
    router.push({ name: 'market' })
  } catch (error: any) {
    alert('Credenciales incorrectas')
    console.error(error)
  }
}
</script>
