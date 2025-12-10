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
