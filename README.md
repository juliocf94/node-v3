# PWA

📁 my-pwa
│
│ 📦 backend
│ ├── 📂 node_modules
│ ├── 📂 src
│ │ ├── 📂 config # configuración global (DB, env, etc.)
│ │ │ └── db.js
│ │ │
│ │ ├── 📂 modules # módulos del proyecto (domain-driven)
│ │ │ ├── 📂 auth
│ │ │ │ ├── 📂 controllers # lógica de entrada (manejan requests/responses)
│ │ │ │ ├── 📂 models # definición de entidades (ej: user.model.js)
│ │ │ │ ├── 📂 routes # rutas específicas del módulo
│ │ │ │ └── 📂 services # lógica de negocio de auth
│ │ │ │
│ │ │ ├── 📂 products
│ │ │ │ ├── 📂 controllers
│ │ │ │ ├── 📂 models
│ │ │ │ ├── 📂 routes
│ │ │ │ └── 📂 services
│ │ │ │
│ │ │ └── 📂 users
│ │ │ ├── 📂 controllers
│ │ │ │ └── customers.controller.js
│ │ │ ├── 📂 models
│ │ │ │ └── customer.model.js
│ │ │ ├── 📂 routes
│ │ │ │ └── customers.routes.js
│ │ │ └── 📂 services
│ │ │ └── customers.service.js
│ │ │
│ │ ├── 📂 routes # definición de rutas globales
│ │ │ └── index.js # importa y combina rutas de los módulos
│ │ │
│ │ ├── 📂 utils # helpers, middlewares reutilizables
│ │ │ ├── asyncHandler.js
│ │ │ └── errorHandler.js
│ │ │
│ │ └── app.js # punto de entrada de la aplicación
│ │
│ ├── .env # variables de entorno (DB_URL, PORT, etc.)
│ ├── .gitignore
│ ├── eslint.config.js # configuración ESLint
│ ├── jsconfig.json # soporte de paths en JS
│ ├── my-loader.mjs # loader personalizado (?)
│ ├── package-lock.json
│ └── package.json
│
│ 📦 frontend
│ ├── 📂 public
│ ├── 📂 node_modules
│ ├── 📂 src
│ │ ├── 📂 assets # imágenes, fuentes, íconos globales
│ │ ├── 📂 features # módulos/funcionalidades (domain-driven)
│ │ │ ├── 📂 auth # módulo de autenticación
│ │ │ │ ├── 📂 api # endpoints específicos de auth
│ │ │ │ ├── 📂 services # lógica de negocio auth
│ │ │ │ ├── 📂 components # UI específica de auth (LoginForm, etc.)
│ │ │ │ └── 📂 hooks # hooks relacionados a auth (useAuth, etc.)
│ │ │ ├── 📂 products # módulo de productos
│ │ │ │ ├── 📂 api
│ │ │ │ ├── 📂 services
│ │ │ │ ├── 📂 components
│ │ │ │ └── 📂 hooks
│ │ │ └── 📂 users # módulo de usuarios
│ │ │ ├── 📂 api
│ │ │ ├── 📂 services
│ │ │ ├── 📂 components
│ │ │ └── 📂 hooks
│ │ │
│ │ ├── 📂 shared # código compartido entre features
│ │ │ ├── 📂 api # HttpClient, interceptores, endpoints globales
│ │ │ │ └── HttpClient.js
│ │ │ ├── 📂 components # UI compartida (botones, layouts, modales)
│ │ │ │ ├── 📂 atoms
│ │ │ │ ├── 📂 molecules
│ │ │ │ └── 📂 organisms
│ │ │ ├── 📂 config # constantes, endpoints, env wrappers
│ │ │ ├── 📂 hooks # hooks reutilizables (useDebounce, useFetch)
│ │ │ ├── 📂 providers # contextos globales (AuthProvider, ThemeProvider)
│ │ │ └── 📂 utils # funciones auxiliares (formatDate, validators)
│ │ │
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ ├── main.jsx
│ │
│ ├── .env
│ ├── .gitignore
│ ├── package.json
│ └── vite.config.js
