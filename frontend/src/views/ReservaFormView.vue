<template>
  <div class="reserva-container">
    <div class="reserva-card">
      <div class="reserva-header">
        <h1 class="reserva-title">Reservar destino</h1>
        <div class="destino-badge">
          Destino #{{ idDestino }}
        </div>
      </div>

      <div class="reserva-content">
        <form @submit.prevent="crearReserva" class="reserva-form">
          <div class="form-group">
            <label for="fecha">Fecha de la visita</label>
            <input 
              id="fecha" 
              v-model="fecha" 
              type="date" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="personas">Cantidad de personas</label>
            <div class="personas-input-container">
              <button type="button" @click="decrementarPersonas" class="personas-btn">−</button>
              <input 
                id="personas" 
                v-model="personas" 
                type="number" 
                min="1" 
                required
              />
              <button type="button" @click="incrementarPersonas" class="personas-btn">+</button>
            </div>
          </div>

          <div class="precio-estimado" v-if="destinoInfo">
            <div class="precio-item">
              <span>Precio base</span>
              <span>${{ destinoInfo.precio }}</span>
            </div>
            <div class="precio-item">
              <span>Personas</span>
              <span>x {{ personas }}</span>
            </div>
            <div class="precio-item precio-total">
              <span>Total estimado</span>
              <span>${{ totalEstimado }}</span>
            </div>
          </div>

          <button type="submit" class="reserva-button">
            <span class="button-icon">✓</span>
            Confirmar reserva
          </button>
        </form>

        <div class="reserva-info">
          <h3 class="info-title">Información importante</h3>
          <ul class="info-list">
            <li>Las reservas deben realizarse con al menos 24 horas de anticipación.</li>
            <li>El pago se realizará en el destino al momento de la visita.</li>
            <li>Puedes cancelar tu reserva hasta 48 horas antes sin cargo.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const idDestino = route.params.id
const fecha = ref('')
const personas = ref(1)
const destinoInfo = ref(null)
const loading = ref(false)

// Establecer la fecha mínima a mañana
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const minDate = tomorrow.toISOString().split('T')[0]
fecha.value = minDate

// Cargar información del destino
onMounted(async () => {
  try {
    loading.value = true
    const response = await axios.get(`http://localhost:3000/api/destinos/${idDestino}`)
    destinoInfo.value = response.data.destino
  } catch (error) {
    console.error('Error al cargar información del destino:', error)
  } finally {
    loading.value = false
  }
})

// Calcular precio total estimado
const totalEstimado = computed(() => {
  if (!destinoInfo.value) return '0'
  return (destinoInfo.value.precio * personas.value).toFixed(2)
})

// Funciones para incrementar/decrementar personas
const incrementarPersonas = () => {
  personas.value++
}

const decrementarPersonas = () => {
  if (personas.value > 1) {
    personas.value--
  }
}

const crearReserva = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Debes iniciar sesión para realizar una reserva')
      router.push('/login')
      return
    }

    loading.value = true

    await axios.post(
      'http://localhost:3000/api/reservas',
      {
        id_destino: idDestino,
        fecha: fecha.value,
        cantidad_personas: personas.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // Mostrar mensaje de éxito
    alert('¡Reserva realizada con éxito!')
    router.push('/reservas')
  } catch (error) {
    console.error('Error al crear la reserva:', error)
    alert('Hubo un error al crear la reserva. Por favor, inténtalo de nuevo.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reserva-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

.reserva-card {
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.reserva-header {
  padding: 24px 30px;
  background: linear-gradient(to right, #4ade80, #22c55e);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reserva-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.destino-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.reserva-content {
  padding: 30px;
}

.reserva-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 15px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: #f9fafb;
}

.form-group input:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
}

.personas-input-container {
  display: flex;
  align-items: center;
}

.personas-input-container input {
  text-align: center;
  width: 70px;
  margin: 0 10px;
  -moz-appearance: textfield;
}

.personas-input-container input::-webkit-outer-spin-button,
.personas-input-container input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.personas-btn {
  width: 36px;
  height: 36px;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.personas-btn:hover {
  background-color: #e2e8f0;
}

.precio-estimado {
  margin-top: 10px;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e2e8f0;
}

.precio-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 15px;
  color: #64748b;
}

.precio-total {
  border-top: 1px solid #e2e8f0;
  margin-top: 5px;
  padding-top: 10px;
  font-weight: 600;
  color: #334155;
}

.reserva-button {
  margin-top: 10px;
  padding: 12px;
  background-color: #4ade80;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon {
  margin-right: 10px;
  font-size: 18px;
}

.reserva-button:hover {
  background-color: #22c55e;
}

.reserva-info {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.info-title {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 12px;
}

.info-list {
  list-style: disc;
  padding-left: 20px;
}

.info-list li {
  color: #64748b;
  margin-bottom: 8px;
  font-size: 14px;
}

@media (max-width: 640px) {
  .reserva-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .destino-badge {
    align-self: flex-start;
  }

  .reserva-content {
    padding: 20px;
  }
}
</style>