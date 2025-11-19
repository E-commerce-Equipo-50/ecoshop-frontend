<a name="readme-top"></a>

<div align="center">
  <h3><b>Ecoshop-Frontend</b></h3>

</div>

<!-- TABLA DE CONTENIDO -->

# 📗 Tabla de contenido

- [📖 Sobre el Proyecto](#sobre-el-proyecto)
  - [🛠 Construido con](#construido-con)
    - [Pila de Tecnologías](#pila-de-tecnologias)
    - [Características Principales](#caracteristicas-principales)
- [💻 Empezando](#empezando)
  - [Prerrequisitos](#prerrequisitos)
  - [Configuración](#configuracion)
  - [Instalación](#instalacion)
  - [Uso](#uso)
- [👥 Autores](#autores)
- [🔭 Futuras Características](#futuras-caracteristicas)
- [⭐️ Muestra tu apoyo](#muestra-tu-apoyo)
- [📝 Licencia](#licencia)
- [📂Estructura del Proyecto](#structura-del-proyecto)

<!-- Descripcion del Proyecto -->

# 📖 EcoShop <a name="sobre-el-proyecto"></a>

**EcoShop** es una plataforma de comercio electrónico diseñada no solo para vender, sino para educar y visibilizar el impacto ambiental de nuestras decisiones de consumo. Conectamos marcas sostenibles con consumidores responsables a través de una experiencia transparente, minimalista y educativa.

## 🛠 Construido con <a name="construido-con"></a>


### Pila de Tecnologías <a name="pila-de-tecnologias"></a>
<details>
<summary>Cliente (Frontend)</summary>
<ul>
<li><a href="https://react.dev/">React.js</a></li>
<li><a href="https://vitejs.dev/">Vite</a></li>
<li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
<li><a href="https://zustand-demo.pmnd.rs/">Zustand</a></li>
<li><a href="https://lucide.dev/">Lucide React</a></li>
<li><a href="https://recharts.org/">Recharts</a></li>
</ul>
</details>

<!-- Características -->

### Caracteristicas Principales <a name="caracteristicas-principales"></a>
- **Catálogo Transparente:** Fichas de producto con datos detallados sobre materiales, origen y emisiones.
- **Cálculo de Huella de Carbono:** Visualización en tiempo real del impacto estimado en el carrito y checkout.
- **Eco-Badges:** Sistema de clasificación visual (🌱 Bajo impacto, 🌿 Medio impacto, 🌳 Neutro).
- **Panel para Marcas:** Gestión de inventario y visualización de métricas verdes.


<!-- Empezando -->

## 💻 Empezando <a name="empezando"></a>

Para obtener una copia local y ponerla en funcionamiento, sigue estos pasos sencillos.

### Prerrequisitos

Para ejecutar este proyecto necesitas:

- Instalar Git
- Instalar Node.Js (v16 o superior)
- Un editor de código (como VS Code)

### Configuración

Clona este repositorio en tu carpeta deseada:

```sh
  cd tu-carpeta
  git clone https://github.com/tu-usuario/ecoshop-frontend.git
```

### Instalación

instala las dependecias del proyecto con:

```sh
  cd ecoshop-frontend
  npm install

```

### Uso

Antes de correr el proyecto, configura tus variables de entorno creando un archivo .env:

```sh
    VITE_API_URL=http://localhost:3000/api
```

Para ejecutar el proyecto, usa el siguiente comando:

```sh
  npm run dev
```
Tu proyecto debería mostrarse automáticamente en tu navegador en: http://localhost:5173/.


<!-- Autores -->

## 👥 Autores <a name="autores"></a>

👤 **Dani Morillo**

- GitHub: [@danifromecuador](https://github.com/danifromecuador)
- Linkedin: [danielfromecuador](https://www.linkedin.com/in/danielfromecuador/)

👤 **Agustín Sciammerella**

- Github: [@SCIANMAA](https://github.com/SCIANMAA)
- Linkedin: [linkedin.com/in/AgustínSciammarella](https://www.linkedin.com/in/AgustínSciammarella/)

👤 **Araceli Fernández** 
- Github: [@Araf05](https://github.com/Araf05)
- Linkedin: [Araceli Noemí Fernández ](https://www.linkedin.com/in/araceli-noemi-fernandez/)

👤 **Carolina Hernández**
- Github: [@CaroHernz](https://github.com/CaroHernz)
- Linkedin: [Carolina Hernández](http://linkedin.com/in/carolinahernandezbarra/)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- Futuras Características -->

## 🔭 Futuras Características <a name="futuras-caracteristicas"></a>

- **Eco-Wallet:** Sistema de puntos verdes canjeables por cada compra.
- **Modo Comparativo:** Comparar el impacto ambiental entre dos productos similares.
- **Historias de Impacto:** Blog integrado sobre consumo responsable.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- CONTRIBUTING -->


<!-- Soporte -->

## ⭐️ Muestra tu Apoyo <a name="muestra-tu-apoyo"></a>

Si te gusta este proyecto, ¡dame una estrella en mi [GitHub Repo](https://github.com/E-commerce-Equipo-50/ecoshop-frontend)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>


<!-- LICENSE -->

## 📝 Licencia <a name="licencia"></a>

Este proyecto está bajo licencia [MIT](./MIT).

<p align="right">(<a href="#readme-top">VOlver arriba</a>)</p>

<!-- Estructura del Proyecto -->

## 📂 Estructura del Proyecto <a name="estructura-del-proyecto"></a>

- eco-shop-frontend/
  - index.html
  - package.json
  - vite.config.ts
  - tsconfig.json
  - tailwind.config.js
  - postcss.config.cjs
  - .env.example
  - .eslintrc.cjs
  - .gitignore
  - public/
    - favicon.svg
  - src/
    - main.tsx
    - styles/
      - globals.css
    - app/
      - App.tsx
      - routes.tsx
    - pages/
      - Home/
        - index.tsx
      - Products/
        - index.tsx
      - ProductDetail/
        - index.tsx
      - Cart/
        - index.tsx
      - Checkout/
        - index.tsx
      - Admin/
        - index.tsx
    - components/
      - common/
        - Button.tsx
        - Input.tsx
      - product/
        - ProductCard.tsx
      - eco/
        - EcoBadge.tsx
        - ImpactBar.tsx
    - features/
      - catalog/
        - hooks.ts
        - utils.ts
      - cart/
        - selectors.ts
      - admin/
        - productForm.tsx
    - store/
      - cart.ts
      - auth.ts
    - lib/
      - api/
        - client.ts
        - products.ts
        - orders.ts
        - types.ts
      - hooks/
        - useTheme.ts
      - utils/
        - money.ts
        - eco.ts
      - config.ts
    - assets/
      - images/
    - tests/
      - components/
        - ProductCard.test.tsx
  - .github/
    - workflows/
      - ci.yml
  - README.md


