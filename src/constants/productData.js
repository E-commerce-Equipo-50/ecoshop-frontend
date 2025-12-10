/**
 * Constantes compartidas para productos
 * Este archivo centraliza todos los datos estáticos relacionados con productos
 */

/**
 * Categorías disponibles para productos
 * Se usan en ProductUploadForm y ProductEditForm
 */
export const CATEGORIES = [
  'Ropa Ecológica',
  'Hogar Eco',
  'Belleza Natural',
  'Alimentación',
  'Arte Sostenible',
  'Infantil',
  'Jardinería',
  'Agua Sostenible',
  'Energía Verde',
  'Empaques',
  'Deportes',
  'Muebles'
];

/**
 * Países disponibles para origen de productos
 * Incluye código ISO y nombre en español
 */
export const COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'ES', name: 'España' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' }
];

/**
 * URLs de iconos para certificaciones
 * Mapea cada tipo de certificación a su icono correspondiente
 */
export const CERTIFICATION_ICONS = {
  FAIR_TRADE: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
  CARBON_NEUTRAL: 'https://cdn-icons-png.flaticon.com/512/3094/3094840.png',
  GOTS: 'https://cdn-icons-png.flaticon.com/512/2913/2913133.png'
};
