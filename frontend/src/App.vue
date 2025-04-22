<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: white;
  font-family: 'Helvetica', 'Arial', sans-serif;
}
</style>
