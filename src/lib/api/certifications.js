import { API_BASE_URL, ENDPOINTS } from '../../config/api';
import { getAuthToken } from './utils';

/**
 * API de certificaciones de productos
 */

/**
 * Crear certificación para un producto
 * @param {Object} certificationData - Datos de la certificación
 * @param {string} certificationData.productId - ID del producto
 * @param {string} certificationData.type - Tipo de certificación (FAIR_TRADE, CARBON_NEUTRAL, GOTS)
 * @param {string} certificationData.iconUrl - URL del icono de la certificación
 * @returns {Promise<Object>} Certificación creada
 */
export const createCertification = async (certificationData) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No hay sesión activa. Por favor inicia sesión.');
    }

    // Validaciones
    if (!certificationData.productId || !certificationData.type) {
      throw new Error('El ID del producto y el tipo de certificación son obligatorios');
    }

    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CERTIFICATIONS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(certificationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error al crear certificación:', error);
    throw error;
  }
};
