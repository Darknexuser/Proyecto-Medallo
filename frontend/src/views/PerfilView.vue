<template>
  <div class="p-6 bg-white rounded shadow text-center">
    <h1 class="text-2xl font-bold mb-4">Perfil del Usuario</h1>
    <div v-if="usuario">
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <p><strong>Correo:</strong> {{ usuario.correo }}</p>
      <p><strong>Rol:</strong> {{ usuario.tipo }}</p>
    </div>
    <div v-else>
      <p class="text-red-500">No se pudo cargar el perfil. Asegúrate de haber iniciado sesión.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const usuario = ref(null)

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      usuario.value = payload
      console.log('Usuario logueado:', payload)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
    }
  }
})
</script>
