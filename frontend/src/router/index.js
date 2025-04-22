import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import ServiciosView from '@/views/ServiciosView.vue';
import ContactoView from '@/views/ContactoView.vue';
import LoginView from '@/views/LoginView.vue';
import PerfilView from '@/views/PerfilView.vue';
import ReservasView from '@/views/ReservasView.vue';
import ReservaFormView from '@/views/ReservaFormView.vue';
import CrearDestinoView from '@/views/CrearDestinoView.vue';
import EditarDestinosView from '@/views/EditarDestinosView.vue';
import RegisterView from '@/views/RegisterView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Inicio', component: HomeView },
    { path: '/servicios', name: 'Servicios', component: ServiciosView },
    { path: '/contacto', name: 'Contacto', component: ContactoView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/registro', name: 'registro', component: RegisterView },
    { path: '/perfil', name: 'Perfil', component: PerfilView },
    { path: '/reservas', name: 'Reservas', component: ReservasView },
    { path: '/reservar/:id', name: 'ReservaForm', component: ReservaFormView },
    { path: '/crear-destino',  name: 'crear-destino', component: CrearDestinoView },
    { path: '/editar-destino/:id', name: 'editar-destino', component: EditarDestinosView, meta: { requiereAuth: true, requiereAdmin: true } },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const token = localStorage.getItem('token')
  
  if (to.meta.requiereAuth && !token) {
    next('/login')
  } else if (to.meta.requiereAdmin && usuario.tipo !== 'Administrador') {
    next('/')
  } else {
    next()
  }
})

export default router
