<template>
  <!-- El contenedor-full asegurará que ocupe todo el ancho -->
  <div class="container-full">
    <div class="hero-section">
      <div class="hero-image-container">
        <img src="@/assets/medellin-bg.jpg" alt="Medellín" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Medallo Tours</h1>
        <p class="hero-subtitle">
          Descubre la ciudad a tu manera. Aventuras únicas, experiencias inolvidables.
        </p>
        <p class="hero-text">¡Tu próximo destino comienza aquí!</p>
        <router-link to="/servicios" class="hero-button-link">
          <button class="hero-button">Ver Servicios →</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-full {
  width: 100%;
  overflow-x: hidden; /* Previene scroll horizontal no deseado */
}

.hero-section {
  position: relative;
  width: 100%;
  height: 90vh;
}

.hero-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.635); /* Ajusta la opacidad aquí */
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 1rem;
  z-index: 10;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.hero-subtitle {
  font-size: 1.5rem;
  max-width: 700px;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.hero-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.hero-button {
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hero-button:hover {
  background-color: #57c182;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-text {
    font-size: 1rem;
  }
}
</style>