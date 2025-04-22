<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Mis Reservas</h1>
  
      <!-- Mensajes -->
      <p v-if="mensaje" class="mb-4 text-green-600">{{ mensaje }}</p>
      <p v-if="error" class="mb-4 text-red-600">{{ error }}</p>
  
      <!-- Lista de reservas -->
      <ul v-if="reservas.length">
        <li
          v-for="reserva in reservas"
          :key="reserva.id_reserva"
          class="mb-4 border p-4 rounded-lg shadow-sm"
        >
          <h2 class="text-lg font-semibold">{{ reserva.destino_nombre }}</h2>
          <p class="text-sm text-gray-700">Fecha: {{ reserva.fecha }}</p>
          <p class="text-sm text-gray-700">Número de personas: {{ reserva.numero_personas }}</p>
        </li>
      </ul>
  
      <p v-else-if="!error">No tienes reservas aún.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/services/api';
  
  const reservas = ref([]);
  const mensaje = ref('');
  const error = ref('');
  
  onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      error.value = 'Debes iniciar sesión para ver tus reservas.';
      return;
    }
  
    try {
      const response = await api.get('/reservas', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      reservas.value = response.data.reservas; // Ajusta según tu backend
      mensaje.value = 'Reservas cargadas correctamente';
      console.log('Reservas:', reservas.value);
    } catch (err) {
      console.error('Error al cargar reservas:', err);
      error.value = 'No se pudieron cargar las reservas';
    }
  });
  </script>
  