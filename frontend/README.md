# PWA
📁 my-pwa
│  📦 backend
│  ├── 📂 node_modules
│  ├── 📂 src
│  │   ├── 📂 config                # configuración global (DB, env, etc.)
│  │   │   └── db.js
│  │   │
│  │   ├── 📂 controllers           # lógica de entrada (manejan requests/responses)
│  │   │   └── customers.controller.js
│  │   │
│  │   ├── 📂 models                # definición de entidades
│  │   │   └── (ej: customer.model.js)
│  │   │
│  │   ├── 📂 routes                # definición de rutas/paths de la API
│  │   │   └── (ej: customers.routes.js)
│  │   │
│  │   ├── 📂 services              # lógica de negocio (usa models y repositorios)
│  │   │   └── customers.service.js
│  │   │
│  │   ├── 📂 utils                 # helpers, middlewares reutilizables
│  │   │   └── (ej: logger.js, errorHandler.js)
│  │   │
│  │   └── app.js                   # punto de entrada de la aplicación
│  │
│  ├── .env                         # variables de entorno (DB_URL, PORT, etc.)
│  ├── .gitignore
│  ├── eslint.config.js             # configuración ESLint
│  ├── jsconfig.json                # soporte de paths en JS
│  ├── my-loader.mjs                # loader personalizado (?)
│  ├── package-lock.json
│  └── package.json
│
│  📦 frontend
│  ├── 📂 public
│  │── 📂 node_modules
│  ├── 📂 src
│  │   ├── 📂 assets                # imágenes, fuentes, íconos globales
│  │   ├── 📂 features              # módulos/funcionalidades (domain-driven)
│  │   │   ├── 📂 auth              # módulo de autenticación
│  │   │   │   ├── 📂 api           # endpoints específicos de auth
│  │   │   │   ├── 📂 services      # lógica de negocio auth
│  │   │   │   ├── 📂 components    # UI específica de auth (LoginForm, etc.)
│  │   │   │   └── 📂 hooks         # hooks relacionados a auth (useAuth, etc.)
│  │   │   ├── 📂 products          # módulo de productos
│  │   │   │   ├── 📂 api
│  │   │   │   ├── 📂 services
│  │   │   │   ├── 📂 components
│  │   │   │   └── 📂 hooks
│  │   │   └── 📂 users             # módulo de usuarios
│  │   │       ├── 📂 api
│  │   │       ├── 📂 services
│  │   │       ├── 📂 components
│  │   │       └── 📂 hooks
│  │   │
│  │   ├── 📂 shared                # código compartido entre features
│  │   │   ├── 📂 api               # HttpClient, interceptores, endpoints globales
│  │   │   │   └── HttpClient.js
│  │   │   ├── 📂 components        # UI compartida (botones, layouts, modales)
│  |   |   |   └── 📂 atoms
│  |   |   |   └── 📂 molecules
│  |   |   |   └── 📂 organisms
│  │   │   ├── 📂 config            # constantes, endpoints, env wrappers
│  │   │   ├── 📂 hooks             # hooks reutilizables (useDebounce, useFetch)
│  │   │   ├── 📂 providers         # contextos globales (AuthProvider, ThemeProvider)
│  │   │   └── 📂 utils             # funciones auxiliares (formatDate, validators)
│  │   │
│  │   ├── App.css
│  │   ├── App.jsx
│  │   ├── index.css
│  │   ├── main.jsx
│  │
│  ├── .env
│  ├── .gitignore
│  ├── package.json
│  └── vite.config.js
└──

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
