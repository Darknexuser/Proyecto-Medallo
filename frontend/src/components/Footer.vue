<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Contacto</h3>
        <p>Email: darknexuser@gmail.com</p>
        <p>Teléfono: +57 3017617993</p>
      </div>
      
      <div class="footer-section">
        <h3>Enlaces</h3>
        <ul>
          <li><a href="#">Acerca de</a></li>
          <li><a href="#">Términos</a></li>
          <li><a href="#">Privacidad</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>Síguenos</h3>
        
<a href="https://www.facebook.com/profile.php?id=61562243290720" target="_blank" class="hover:underline">Facebook</a> <br>
<a href="https://www.instagram.com/medallotours1/" target="_blank" class="hover:underline">Instagram</a><br>
<a href="https://www.tiktok.com/@agenciamedallotours.1?lang=en" target="_blank" class="hover:underline">TikTok</a><br>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Medallo Tours. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #343a40;
  color: white;
  padding: 2rem 0;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap; /* Para dispositivos móviles */
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem; /* Espacio entre secciones */
}

.footer-section {
  flex: 1;
  min-width: 250px;
}

.footer-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #555;
}
</style>
