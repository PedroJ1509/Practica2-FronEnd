import { createRouter, createWebHistory } from 'vue-router';
// import authService from "@/services/authService";

// Componentes de las vistas
import Login from "@/views/Login";
import Home from "@/components/Home";
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),  // Usamos el historial web para navegación en el navegador
  routes,
});

export default router;