<template>
  <div class="max-w-xl mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-4">Editar destino</h1>

    <form @submit.prevent="editarDestino">
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Nombre</label>
        <input v-model="destino.nombre" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Descripción</label>
        <textarea v-model="destino.descripcion" class="w-full border p-2 rounded"></textarea>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Precio</label>
        <input type="number" v-model="destino.precio" class="w-full border p-2 rounded" required />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Guardar cambios
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const destino = ref({
  nombre: '',
  descripcion: '',
  precio: ''
})

const token = localStorage.getItem('token')


onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/destinos`)
    const destinoFiltrado = data.destinos.find(d => d.id_destino == route.params.id)
    destino.value = destinoFiltrado
  } catch (error) {
    console.error('Error al cargar el destino:', error)
  }
})

const editarDestino = async () => {
  try {
    await axios.put(`http://localhost:3000/api/destinos/${route.params.id}`, destino.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    alert('Destino actualizado correctamente')
    router.push('/servicios')
  } catch (error) {
    console.error('Error al actualizar destino:', error)
    alert('Error al actualizar el destino')
  }
}
</script>
