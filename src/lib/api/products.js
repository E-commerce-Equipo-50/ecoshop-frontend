import { API_BASE_URL, ENDPOINTS } from '../../config/api';
import { getAuthToken } from './utils';

/**
 * API de productos
 */

/**
 * Crear nuevo producto
 * @param {Object} productData - Datos del producto
 * @param {string} productData.brand - Marca del producto
 * @param {string} productData.name - Nombre del producto
 * @param {number} productData.price - Precio
 * @param {number} productData.stock - Stock inicial
 * @param {string} productData.category - Categoría
 * @param {string} productData.description - Descripción
 * @param {string} productData.originCountry - País de origen
 * @param {string} productData.materials - Materiales
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (productData) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No hay sesión activa. Por favor inicia sesión.');
    }

    // Validaciones
    if (!productData.brand || !productData.name || !productData.price || 
        productData.stock === undefined || !productData.category) {
      throw new Error('Todos los campos obligatorios deben estar completos');
    }

    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CREATE_PRODUCT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};
