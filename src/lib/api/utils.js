/**
 * Utilidades para validaciones comunes
 */

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida requisitos de password
 * Mínimo 10 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo
 */
export const isValidPassword = (password) => {
  if (password.length < 10) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber && hasSymbol;
};

/**
 * Obtiene el token de autenticación del localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Verifica si hay una sesión activa
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};
