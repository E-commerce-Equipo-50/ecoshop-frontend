# 📁 Estructura de API

La API está organizada en módulos independientes para mejor mantenibilidad y escalabilidad.

## 📂 Organización

```
src/lib/api/
├── index.js              # Punto de entrada - re-exporta todo
├── auth.js              # Autenticación (clientes y vendedores)
├── products.js          # CRUD de productos
├── metrics.js           # Métricas de impacto ambiental
├── certifications.js    # Certificaciones de productos
└── utils.js             # Utilidades y validaciones
```

## 🔧 Uso

### Importar desde el índice (recomendado)
```javascript
import { 
  loginClient, 
  registerSeller, 
  createProduct, 
  createMetric 
} from '../../lib/api';
```

### Importar módulo específico
```javascript
import { loginClient } from '../../lib/api/auth';
import { createProduct } from '../../lib/api/products';
```

## 📚 Módulos

### auth.js
- `registerClient({ email, password, name })`
- `loginClient({ email, password })`
- `registerSeller({ brandName, email, password })`
- `loginSeller({ email, password })`

### products.js
- `createProduct(productData)`

### metrics.js
- `createMetric({ productId, type, value, comparison_value, unit })`

### certifications.js
- `createCertification({ productId, type, iconUrl })`

### utils.js
- `isValidEmail(email)`
- `isValidPassword(password)`
- `getAuthToken()`
- `isAuthenticated()`

## ✅ Beneficios

- ✨ **Organizado por dominio**: Cada módulo maneja una responsabilidad
- 🔍 **Fácil de encontrar**: Ubicación lógica de funciones
- 🧪 **Testeable**: Módulos independientes
- 📦 **Escalable**: Agregar nuevos módulos sin afectar existentes
- 🤝 **Colaborativo**: Múltiples desarrolladores pueden trabajar en paralelo
