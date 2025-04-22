<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Lado izquierdo: Imagen -->
      <div class="login-image-container">
        <img :src="loginImage" alt="Login" class="login-image" />
      </div>

      <!-- Lado derecho: Formulario -->
      <div class="login-form-container">
        <h2 class="login-title">Iniciar Sesión</h2>

        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              v-model="correo"
              required
            />
          </div>

          <div class="form-group">
            <label for="contraseña">Contraseña</label>
            <input
              id="contraseña"
              type="password"
              v-model="contraseña"
              required
            />
          </div>

          <button type="submit" class="login-button">
            Iniciar Sesión
          </button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>

        <p class="register-link">
          ¿No tienes una cuenta? 
          <router-link to="/registro">Regístrate aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import loginImage from '@/assets/forlogin.png'

const correo = ref('')
const contraseña = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await api.post('/auth/login', {
      correo: correo.value,
      contraseña: contraseña.value
    })
    localStorage.setItem('token', response.data.token)
    
    // Obtener información del usuario y guardarla
    try {
      const userResponse = await api.get('/auth/perfil', {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      })
      localStorage.setItem('usuario', JSON.stringify(userResponse.data.usuario))
    } catch (userError) {
      console.error('Error al obtener datos del usuario:', userError)
    }
    
    router.push('/')
  } catch (error) {
    error.value = 'Correo o contraseña incorrectos'
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

.login-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.login-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: linear-gradient(45deg, #f9f9f9, #ffffff);
}

.login-image {
  max-width: 80%;
  max-height: 200px;
  object-fit: contain;
}

.login-form-container {
  padding: 40px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.login-form {
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

.login-button {
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

.login-button:hover {
  background-color: #22c55e;
}

.error-message {
  margin-top: 16px;
  color: #ef4444;
  text-align: center;
  font-size: 14px;
}

.register-link {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #4ade80;
  font-weight: 500;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Media queries para pantallas más grandes */
@media (min-width: 768px) {
  .login-card {
    flex-direction: row;
    height: 500px;
  }
  
  .login-image-container {
    width: 45%;
    padding: 0;
  }
  
  .login-form-container {
    width: 55%;
    padding: 40px 50px;
  }
  
  .login-image {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>