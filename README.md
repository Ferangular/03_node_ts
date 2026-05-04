# Backend Node.js con TypeScript

Proyecto de backend construido con Node.js y TypeScript, configurado con un entorno de desarrollo robusto incluyendo pruebas automatizadas con Jest.

## 🚀 Características

- **TypeScript** para tipado estático y mejor experiencia de desarrollo
- **Jest** para pruebas unitarias y de integración
- **Nodemon** para recarga automática en desarrollo
- **CommonJS** como sistema de módulos (compatible con el ecosistema Node.js)
- **Coverage** de código integrado
- **Scripts** optimizados para desarrollo y producción

## 📋 Requisitos

- Node.js 18+ 
- npm 8+

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd 03_node_ts

# Instalar dependencias
npm install
```

## 🏗️ Estructura del Proyecto

```
03_node_ts/
├── src/                    # Código fuente TypeScript
│   ├── js-foundation/      # Ejercicios fundamentales de JS/TS
│   ├── plugins/            # Plugins y utilidades
│   └── app.ts             # Punto de entrada
├── test/                   # Archivos de prueba
│   ├── js-foundation/
│   └── plugins/
├── dist/                   # Código compilado JavaScript
├── jest.config.ts         # Configuración de Jest
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

## ⚙️ Configuración de TypeScript

El archivo `tsconfig.json` está configurado con las siguientes opciones clave:

### Opciones del Compilador

```json
{
  "compilerOptions": {
    "rootDir": "src",           // Directorio raíz del código fuente
    "outDir": "dist/",          // Directorio de salida para archivos compilados
    "module": "commonjs",       // Sistema de módulos (CommonJS para Node.js)
    "target": "es2020",         // Versión de JavaScript objetivo
    "moduleResolution": "node", // Estrategia de resolución de módulos
    "strict": true,             // Habilita todas las verificaciones estrictas
    "esModuleInterop": true,    // Mejor interoperabilidad entre CommonJS y ES modules
    "skipLibCheck": true,       // Omite verificación de tipos en archivos de declaración
    "forceConsistentCasingInFileNames": true, // Forza consistencia en mayúsculas/minúsculas
    "resolveJsonModule": true,  // Permite importar archivos JSON
    "isolatedModules": true,    // Asegura que cada archivo pueda ser transpilado independientemente
    "types": ["node", "jest"],  // Tipos globales disponibles
    "lib": ["es2020"],          // Bibliotecas estándar incluidas
    "sourceMap": true,           // Genera source maps para debugging
    "declaration": true,         // Genera archivos .d.ts
    "ignoreDeprecations": "6.0" // Ignora advertencias de deprecación
  }
}
```

### Explicación de las Configuraciones Principales

- **`module: "commonjs"`**: Usa CommonJS para máxima compatibilidad con el ecosistema Node.js
- **`target: "es2020"`**: Compila a JavaScript moderno pero compatible
- **`strict: true`**: Habilita todas las verificaciones estrictas de TypeScript para mayor calidad del código
- **`esModuleInterop: true`**: Permite usar sintaxis de importación ES con módulos CommonJS
- **`isolatedModules: true`**: Requerido por herramientas modernas como Jest y Babel
- **`types: ["node", "jest"]`**: Incluye tipos para Node.js y Jest globalmente
- **`ignoreDeprecations: "6.0"`**: Silencia advertencias de configuraciones obsoletas

## 🧪 Configuración de Jest

El archivo `jest.config.ts` está configurado para trabajar perfectamente con TypeScript:

```typescript
const config: Config = {
  preset: "ts-jest",                    // Usa el preset de TypeScript para Jest
  testEnvironment: "node",              // Entorno de ejecución Node.js
  clearMocks: true,                     // Limpia mocks entre tests
  collectCoverage: true,                // Recopila cobertura de código
  coverageDirectory: "coverage",         // Directorio para reportes de cobertura
  coverageProvider: "v8",               // Motor de cobertura
  
  testPathIgnorePatterns: [             // Ignora estos directorios
    "/node_modules/",
    "/dist/"
  ],
  
  testMatch: [                          // Patrones para encontrar tests
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  
  moduleFileExtensions: ["ts", "js", "json"], // Extensiones a procesar
  
  transformIgnorePatterns: [            // Transforma estos paquetes
    "node_modules/(?!(uuid|get-age|axios)/)"
  ]
};
```

## 📦 Scripts Disponibles

```json
{
  "test": "jest",                    // Ejecuta todos los tests
  "test:watch": "jest --watch",      // Ejecuta tests en modo watch
  "test:coverage": "jest --coverage", // Ejecuta tests con reporte de cobertura
  "dev": "nodemon",                  // Inicia servidor en desarrollo
  "build": "npm run test && rimraf ./dist && tsc", // Compila para producción
  "start": "node dist/app.js"        // Inicia servidor en producción
}
```

## 🔧 Desarrollo

### Iniciar Servidor de Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor con recarga automática cada vez que guardes cambios.

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch (se reinician automáticamente)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

### Compilar para Producción

```bash
npm run build
```

Esto compilará el código TypeScript a JavaScript en la carpeta `dist/`.

### Iniciar Servidor de Producción

```bash
npm start
```

## 📊 Reporte de Cobertura

Los tests generan un reporte de cobertura en la carpeta `coverage/`. Abre `coverage/lcov-report/index.html` en tu navegador para ver el reporte detallado.

## 🧪 Ejemplos de Tests

El proyecto incluye ejemplos de tests para:

- **Plugins**: Logger, cliente HTTP, cálculo de edad, generación de UUID
- **Fundamentos JavaScript/TypeScript**: Templates, destructuring, callbacks, factory pattern, promises

## 🔍 Depuración

Los source maps están habilitados, lo que permite depurar el código TypeScript directamente en tu IDE o en las herramientas de desarrollo del navegador.

## 📚 Referencias

- [Documentación oficial de Node.js con TypeScript](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)
- [Documentación oficial de Jest](https://jestjs.io/docs/getting-started)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para detalles.
