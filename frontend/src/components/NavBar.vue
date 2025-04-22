<template>

    

  <nav class="navbar">
    <ul class="nav-items">
      <img src="../assets/logo.png" class="logo" alt="Logo" />
      <li>MEDALLO TOURS </li>
      <li class="nav-item"><router-link to="/">Inicio</router-link></li>
      <li class="nav-item"><router-link to="/servicios">Servicios</router-link></li>
      <li class="nav-item"><router-link to="/reservas">Contactanos</router-link></li>
      <li class="nav-item"><router-link to="/login">Login</router-link></li>
      <li class="nav-item"><router-link to="/perfil">Perfil</router-link></li>

    </ul>
  </nav>
</template>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center; /* o flex-start si lo quieres a la izquierda */
}

.logo {
  max-width: 100px; /* Ajusta este valor según necesites */
  height: auto; /* Mantiene la proporción */
}

.navbar {
  background-color: #f8f9fa; /* Puedes cambiar esto a tu gusto */
  padding: 1rem;
}

.nav-items {
  display: flex; /* Esto hace que los elementos se muestren en línea */
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px; /* Espacio entre elementos */
}

.nav-item {
  /* Estilos para cada elemento de navegación */
}

.nav-item a {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-item a:hover {
  background-color: #6de9b7;
}
</style>

