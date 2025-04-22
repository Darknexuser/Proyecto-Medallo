<template>
  <div class="registro-container">
    <div class="registro-card">
      <!-- Imagen -->
      <div class="registro-image-container">
        <img :src="registroImage" alt="Registro" class="registro-image" />
      </div>

      <!-- Formulario -->
      <div class="registro-form-container">
        <h2 class="registro-title">Crear Cuenta</h2>

        <form @submit.prevent="registrar" class="registro-form">
          <div class="form-group">
            <label for="nombre">Nombre completo</label>
            <input id="nombre" type="text" v-model="nombre" required />
          </div>

          <div class="form-group">
            <label for="correo">Correo electrónico</label>
            <input id="correo" type="email" v-model="correo" required />
          </div>

          <div class="form-group">
            <label for="contraseña">Contraseña</label>
            <input id="contraseña" type="password" v-model="contraseña" required />
          </div>

          <div class="form-group">
            <label for="confirmarContraseña">Confirmar contraseña</label>
            <input id="confirmarContraseña" type="password" v-model="confirmarContraseña" required />
          </div>

          <!-- Mostrar selector de tipo solo si el usuario logueado es administrador principal -->
          <div class="form-group" v-if="esAdminPrincipal">
            <label for="tipo">Tipo de usuario</label>
            <select id="tipo" v-model="tipo" required>
              <option disabled value="">Selecciona un tipo</option>
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <button type="submit" class="registro-button">Crear Cuenta</button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>

        <p class="login-link">
          ¿Ya tienes una cuenta?
          <router-link to="/login">Inicia sesión aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import registroImage from '@/assets/forlogin.png'

const nombre = ref('')
const correo = ref('')
const contraseña = ref('')
const confirmarContraseña = ref('')
const tipo = ref('Cliente') // Por defecto, todos serán Cliente
const error = ref('')
const esAdminPrincipal = ref(false)

const router = useRouter()

onMounted(() => {
  const storedUser = localStorage.getItem('usuario')
  if (storedUser) {
    const user = JSON.parse(storedUser)
    // Supongamos que el admin principal tiene id = 1
    esAdminPrincipal.value = user.tipo === 'Administrador' && user.id === 1
  }
})

const registrar = async () => {
  if (contraseña.value !== confirmarContraseña.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  try {
    await api.post('/auth/register', {
      nombre: nombre.value,
      correo: correo.value,
      contraseña: contraseña.value,
      tipo: tipo.value
    })

    router.push('/login')
  } catch (err) {
    if (err.response?.data?.mensaje) {
      error.value = err.response.data.mensaje
    } else {
      error.value = 'Error al registrar el usuario. Inténtalo de nuevo.'
    }
  }
}
</script>

  
  <style scoped>
  .registro-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    padding: 20px;
  }
  
  .registro-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }
  
  .registro-image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: linear-gradient(45deg, #f9f9f9, #ffffff);
  }
  
  .registro-image {
    max-width: 80%;
    max-height: 200px;
    object-fit: contain;
  }
  
  .registro-form-container {
    padding: 40px;
  }
  
  .registro-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
    color: #333;
    text-align: center;
  }
  
  .registro-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-size: 14px;
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
  
  .registro-button {
    margin-top: 10px;
    padding: 12px;
    background-color: #4ade80;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .registro-button:hover {
    background-color: #22c55e;
  }
  
  .error-message {
    margin-top: 16px;
    color: #ef4444;
    text-align: center;
    font-size: 14px;
  }
  
  .login-link {
    margin-top: 24px;
    text-align: center;
    font-size: 14px;
    color: #555;
  }
  
  .login-link a {
    color: #4ade80;
    font-weight: 500;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  /* Media queries para pantallas más grandes */
  @media (min-width: 768px) {
    .registro-card {
      flex-direction: row;
      min-height: 550px;
    }
    
    .registro-image-container {
      width: 45%;
      padding: 0;
    }
    
    .registro-form-container {
      width: 55%;
      padding: 40px 50px;
    }
    
    .registro-image {
      max-height: 100%;
      max-width: 100%;
    }
  }
  </style>