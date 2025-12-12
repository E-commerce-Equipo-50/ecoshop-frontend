import { API_BASE_URL, ENDPOINTS } from '../../config/api';

/**
 * API del carrito de compras
 * Requiere autenticación de cliente
 */

/**
 * Obtener token del localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Agregar producto al carrito
 * @param {string} productId - ID del producto
 * @param {number} quantity - Cantidad a agregar
 * @returns {Promise<Object>} Respuesta del servidor con el item agregado
 */
export const addToCart = async (productId, quantity = 1) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('NO_AUTH');
    }

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CART_ADD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: Number(quantity)
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener carrito activo del cliente
 * @returns {Promise<Object>} Carrito con todos sus items
 */
export const getCart = async () => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('NO_AUTH');
    }

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CART_GET}`, {
      method: 'GET',
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

    throw error;
  }
};

/**
 * Obtener la cantidad total de items en el carrito
 * @returns {Promise<number>} Número total de items
 */
export const getCartItemCount = async () => {
  try {
    const data = await getCart();
    const items = data.cart?.items || [];
    
    // Sumar todas las cantidades
    return items.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    // Si hay error, retornar 0
    return 0;
  }
};
/**
 * Obtener cantidad actual de un producto específico en el carrito
 * @param {string} productId - ID del producto
 * @returns {Promise<number>} Cantidad actual en el carrito (0 si no está)
 */
export const getProductQuantityInCart = async (productId) => {
  try {
    const data = await getCart();
    
    if (!data || !data.cart || !data.cart.items || data.cart.items.length === 0) {
      return 0;
    }
    
    const item = data.cart.items.find(item => {
      const itemProductId = item.product?.id || item.product;
      return itemProductId === productId;
    });
    
    return item ? item.quantity : 0;
  } catch (error) {
    return 0;
  }
};
/**
 * Remover item del carrito
 * @param {string} itemId - ID del item a remover
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const removeFromCart = async (itemId) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('NO_AUTH');
    }

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CART_REMOVE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Actualizar cantidad de un item en el carrito
 * @param {string} itemId - ID del item
 * @param {number} quantity - Nueva cantidad
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const updateCartItemQuantity = async (itemId, quantity) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('NO_AUTH');
    }

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CART_UPDATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId,
        quantity: Number(quantity)
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
