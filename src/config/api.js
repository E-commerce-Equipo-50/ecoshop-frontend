/**
 * Configuración de la API
 */

// ===== CONFIGURACIÓN DE ENTORNO =====
// Cambia esta variable para usar backend local o en producción:
const USE_LOCAL_BACKEND = false; // true = localhost:8080, false = Render

// URL base del backend
export const API_BASE_URL = USE_LOCAL_BACKEND 
  ? 'http://localhost:8080/api'  // Backend local (desarrollo)
  : 'https://ecoshop-backend-00ta.onrender.com/api';  // Backend en Render (producción)

// Endpoints disponibles
export const ENDPOINTS = {
  // Productos
  PRODUCTS: '/Productos',
  CREATE_PRODUCT: '/productos',
  
  // Autenticación - Cliente
  CLIENT_REGISTER: '/cliente/registro',
  CLIENT_LOGIN: '/cliente/login',
  
  // Autenticación - Vendedor/Marca
  SELLER_REGISTER: '/marcas/registro',
  SELLER_LOGIN: '/marcas/login',
  
  // Métricas e Impacto
  IMPACT: '/impacto',
  
  // Certificaciones
  CERTIFICATIONS: '/certificaciones',
  
  // Carrito de compras
  CART_ADD: '/carrito/add',
  CART_GET: '/carrito',
  CART_REMOVE: '/carrito/remove',
  CART_UPDATE: '/carrito/update',
};
