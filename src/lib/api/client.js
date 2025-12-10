import { API_BASE_URL, ENDPOINTS } from '../../config/api';

/**
 * Cliente API para autenticación de usuarios
 */

// ==================== VALIDACIONES ====================

/**
 * Valida formato de email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida requisitos de password
 * Mínimo 10 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo
 */
const isValidPassword = (password) => {
  if (password.length < 10) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber && hasSymbol;
};

// ==================== CLIENTE ====================

/**
 * Registrar nuevo cliente
 * @param {Object} userData - Datos del cliente
 * @param {string} userData.email - Email del cliente (obligatorio)
 * @param {string} userData.password - Contraseña (obligatorio, mín. 10 caracteres)
 * @param {string} userData.name - Nombre completo (opcional, máx. 60 caracteres)
 * @returns {Promise<Object>} { message, accessToken, user }
 */
export const registerClient = async ({ email, password, name }) => {
  try {
    // Validaciones
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }
    
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    
    if (!isValidPassword(password)) {
      throw new Error('La contraseña debe tener mínimo 10 caracteres, incluyendo mayúscula, minúscula, número y símbolo');
    }
    
    if (name && name.length > 60) {
      throw new Error('El nombre no puede superar los 60 caracteres');
    }
    
    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CLIENT_REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
        ...(name && { name })
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    throw error;
  }
};

/**
 * Login de cliente
 * @param {Object} credentials - Credenciales
 * @param {string} credentials.email - Email del cliente
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<Object>} { message, accessToken, user }
 */
export const loginClient = async ({ email, password }) => {
  try {
    // Validaciones
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }
    
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    
    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CLIENT_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error al hacer login de cliente:', error);
    throw error;
  }
};

// ==================== VENDEDOR/MARCA ====================

/**
 * Registrar nuevo vendedor
 * @param {Object} sellerData - Datos del vendedor
 * @param {string} sellerData.brandName - Nombre de la marca (obligatorio, máx. 100 caracteres)
 * @param {string} sellerData.email - Email del vendedor (obligatorio)
 * @param {string} sellerData.password - Contraseña (obligatorio, mín. 10 caracteres)
 * @returns {Promise<Object>} { message, accessToken, seller }
 */
export const registerSeller = async ({ brandName, email, password }) => {
  try {
    // Validaciones
    if (!brandName || !email || !password) {
      throw new Error('Nombre de marca, email y contraseña son obligatorios');
    }
    
    if (brandName.length > 100) {
      throw new Error('El nombre de la marca no puede superar los 100 caracteres');
    }
    
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    
    if (!isValidPassword(password)) {
      throw new Error('La contraseña debe tener mínimo 10 caracteres, incluyendo mayúscula, minúscula, número y símbolo');
    }
    
    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SELLER_REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brandName,
        email: email.toLowerCase(),
        password,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error al registrar vendedor:', error);
    throw error;
  }
};

/**
 * Login de vendedor
 * @param {Object} credentials - Credenciales
 * @param {string} credentials.email - Email del vendedor
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<Object>} { message, accessToken, seller }
 */
export const loginSeller = async ({ email, password }) => {
  try {
    // Validaciones
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }
    
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    
    // Petición
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SELLER_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error al hacer login de vendedor:', error);
    throw error;
  }
};
