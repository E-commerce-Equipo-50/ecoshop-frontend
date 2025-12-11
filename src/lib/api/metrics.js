import { API_BASE_URL, ENDPOINTS } from '../../config/api';
import { getAuthToken } from './utils';

/**
 * API de métricas de impacto ambiental
 */

/**
 * Crear métrica de impacto para un producto
 * @param {Object} metricData - Datos de la métrica
 * @param {string} metricData.productId - ID del producto
 * @param {string} metricData.type - Tipo de métrica (CO2, WATER, ENERGY, RECYCLED)
 * @param {number} metricData.value - Valor del producto
 * @param {number} metricData.comparison_value - Valor de comparación
 * @param {string} metricData.unit - Unidad de medida
 * @returns {Promise<Object>} Métrica creada
 */
export const createMetric = async (metricData) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No hay sesión activa. Por favor inicia sesión.');
    }

    // Validaciones
    if (!metricData.productId || !metricData.type || 
        metricData.value === undefined || metricData.comparison_value === undefined || 
        !metricData.unit) {
      throw new Error('Todos los campos de la métrica son obligatorios');
    }

    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.IMPACT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(metricData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error al crear métrica:', error);
    throw error;
  }
};

/**
 * Obtener métricas de un producto
 * @param {string|number} productId - ID del producto
 * @returns {Promise<Array>} Lista de métricas del producto
 */
export const getProductMetrics = async (productId) => {
  try {
    if (!productId) {
      throw new Error('El ID del producto es requerido');
    }

    const response = await fetch(`${API_BASE_URL}/impacto/${productId}`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error al obtener métricas del producto:', error);
    throw error;
  }
};

/**
 * Actualizar una métrica existente
 * @param {string|number} metricId - ID de la métrica a actualizar
 * @param {Object} metricData - Datos de la métrica a actualizar
 * @param {string} metricData.type - Tipo de métrica (CO2, WATER, ENERGY, RECYCLED)
 * @param {number} metricData.value - Valor del producto
 * @param {number} metricData.comparison_value - Valor de comparación
 * @param {string} metricData.unit - Unidad de medida
 * @returns {Promise<Object>} Métrica actualizada
 */
export const updateMetric = async (metricId, metricData) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No hay sesión activa. Por favor inicia sesión.');
    }

    if (!metricId) {
      throw new Error('El ID de la métrica es requerido');
    }

    // Validaciones
    if (!metricData.type || metricData.value === undefined || 
        metricData.comparison_value === undefined || !metricData.unit) {
      throw new Error('Todos los campos de la métrica son obligatorios');
    }

    const response = await fetch(`${API_BASE_URL}/impacto/${metricId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(metricData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error al actualizar métrica:', error);
    throw error;
  }
};

/**
 * Eliminar una métrica
 * @param {string|number} metricId - ID de la métrica a eliminar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const deleteMetric = async (metricId) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No hay sesión activa. Por favor inicia sesión.');
    }

    if (!metricId) {
      throw new Error('El ID de la métrica es requerido');
    }

    const response = await fetch(`${API_BASE_URL}/impacto/${metricId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error al eliminar métrica:', error);
    throw error;
  }
};
