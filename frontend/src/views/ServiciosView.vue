<template>
  <div class="destinos-container">
    <h1 class="destinos-titulo">Destinos disponibles</h1>

    <div v-if="loading" class="loading-message">
      <div class="spinner"></div>
      <p>Cargando destinos...</p>
    </div>
    
    <div v-else-if="destinos.length === 0" class="empty-message">
      No hay destinos disponibles.
    </div>

    <div v-else class="destinos-grid">
      <div v-for="destino in destinos" :key="destino.id_destino" class="destino-card">
        <h2 class="destino-nombre">{{ destino.nombre }}</h2>
        <p class="destino-descripcion">{{ destino.descripcion }}</p>
        <div class="destino-detalles">
          <p class="destino-ubicacion">
            <span class="detalle-etiqueta">Ubicación:</span> 
            {{ destino.ubicacion }}
          </p>
          <p class="destino-precio">
            <span class="detalle-etiqueta">Precio:</span> 
            {{ destino.precio }}
          </p>
        </div>

        <div class="destino-acciones">
          <router-link
            :to="`/reservar/${destino.id_destino}`"
            class="btn-reservar"
          >
            Reservar
          </router-link>

          <button
            v-if="esAdmin"
            @click="irAEditar(destino.id_destino)"
            class="btn-editar"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const destinos = ref([])
const usuario = ref(null)
const router = useRouter()
const loading = ref(true)
const esAdmin = ref(false)

onMounted(async () => {
  try {
    const storedUser = localStorage.getItem('usuario')
    if (storedUser) {
      usuario.value = JSON.parse(storedUser)
      console.log("Usuario cargado:", usuario.value)
      esAdmin.value = usuario.value.tipo === 'Administrador'
      console.log("¿Es admin?", esAdmin.value)
    }
    const response = await axios.get('http://localhost:3000/api/destinos')
    destinos.value = response.data.destinos
  } catch (error) {
    console.error('Error al cargar destinos:', error)
  } finally {
    loading.value = false
  }
})

const irAEditar = (id) => {
  router.push(`/editar-destino/${id}`)
}
</script>

<style scoped>
.destinos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.destinos-titulo {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.loading-message, .empty-message {
  text-align: center;
  padding: 40px 0;
  font-size: 18px;
  color: #666;
}

.loading-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4ade80;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.destinos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.destino-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.destino-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.destino-nombre {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.destino-descripcion {
  color: #555;
  margin-bottom: 16px;
  line-height: 1.5;
  flex-grow: 1;
}

.destino-detalles {
  margin-bottom: 20px;
}

.destino-ubicacion, .destino-precio {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.detalle-etiqueta {
  font-weight: 600;
  color: #555;
}

.destino-acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
}

.btn-reservar {
  padding: 10px 18px;
  background-color: #4ade80;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s ease;
  text-align: center;
}

.btn-reservar:hover {
  background-color: #22c55e;
}

.btn-editar {
  padding: 8px 16px;
  background-color: #fbbf24;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-editar:hover {
  background-color: #f59e0b;
}

/* Estilos para dispositivos móviles */
@media (max-width: 768px) {
  .destinos-grid {
    grid-template-columns: 1fr;
  }
  
  .destinos-titulo {
    font-size: 28px;
  }
  
  .destino-card {
    padding: 18px;
  }
}

/* Para tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  .destinos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>