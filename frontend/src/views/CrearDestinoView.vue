<template>
  <div class="crear-destino-container">
    <div class="crear-destino-card">
      <div class="crear-destino-header">
        <h2 class="crear-destino-title">Crear nuevo destino</h2>
        <div class="crear-destino-icon">✈️</div>
      </div>

      <div class="crear-destino-content">
        <form @submit.prevent="crearDestino" class="crear-destino-form">
          <div class="form-group">
            <label for="nombre">Nombre del destino</label>
            <input 
              id="nombre" 
              v-model="nombre" 
              placeholder="Ej: Playa del Carmen" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <textarea 
              id="descripcion" 
              v-model="descripcion" 
              placeholder="Describe este destino turístico..." 
              rows="3" 
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="ubicacion">Ubicación</label>
            <input 
              id="ubicacion" 
              v-model="ubicacion" 
              placeholder="Ej: Quintana Roo, México" 
              required 
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="precio">Precio por persona</label>
              <div class="precio-input">
                <span class="precio-symbol">$</span>
                <input 
                  id="precio" 
                  v-model.number="precio" 
                  placeholder="0.00" 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="duracion">Duración</label>
              <input 
                id="duracion" 
                v-model="duracion" 
                placeholder="Ej: 3 días" 
                required 
              />
            </div>
          </div>

          <div class="mensaje-container" v-if="mensaje" :class="{ 'mensaje-exito': exito, 'mensaje-error': !exito }">
            {{ mensaje }}
          </div>

          <button type="submit" class="crear-destino-button" :disabled="enviando">
            <span v-if="enviando" class="spinner"></span>
            <span v-else>Crear destino</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const nombre = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const precio = ref('')
const duracion = ref('')
const mensaje = ref('')
const enviando = ref(false)
const exito = ref(false)

const crearDestino = async () => {
  try {
    enviando.value = true
    mensaje.value = ''
    
    const token = localStorage.getItem('token')
    if (!token) {
      mensaje.value = 'Debe iniciar sesión para crear destinos'
      exito.value = false
      return
    }
    
    const res = await axios.post('http://localhost:3000/api/destinos/crear', {
      nombre: nombre.value,
      descripcion: descripcion.value,
      ubicacion: ubicacion.value,
      precio: precio.value,
      duracion: duracion.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    mensaje.value = res.data.mensaje || 'Destino creado exitosamente'
    exito.value = true
    
    // Limpiar el formulario después de crear exitosamente
    nombre.value = ''
    descripcion.value = ''
    ubicacion.value = ''
    precio.value = ''
    duracion.value = ''
    
    // Opcionalmente redirigir después de un breve tiempo
    setTimeout(() => {
      router.push('/servicios')
    }, 2000)
    
  } catch (err) {
    console.error(err)
    mensaje.value = err.response?.data?.error || 'Error al crear destino'
    exito.value = false
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.crear-destino-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

.crear-destino-card {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.crear-destino-header {
  padding: 24px 30px;
  background: linear-gradient(to right, #4ade80, #22c55e);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crear-destino-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.crear-destino-icon {
  font-size: 24px;
}

.crear-destino-content {
  padding: 30px;
}

.crear-destino-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: #f9fafb;
  width: 100%;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
}

.precio-input {
  position: relative;
}

.precio-symbol {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.precio-input input {
  padding-left: 24px;
}

.mensaje-container {
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.mensaje-exito {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.mensaje-error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.crear-destino-button {
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
  justify-content: center;
  align-items: center;
  height: 48px;
}

.crear-destino-button:hover {
  background-color: #22c55e;
}

.crear-destino-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
  
  .crear-destino-content {
    padding: 20px;
  }
}
</style>