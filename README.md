# NOC (Node Operations Center) - Sistema de Monitoreo

Proyecto de backend construido con Node.js y TypeScript para monitoreo de servicios y endpoints mediante tareas programadas (cron jobs).

## 🚀 Características

- **TypeScript** para tipado estático y mejor experiencia de desarrollo
- **Monitoreo Automático** de endpoints externos y servicios locales
- **Cron Jobs** para verificaciones periódicas configurables
- **Logging** detallado de estados y errores
- **Jest** para pruebas unitarias y de integración
- **Nodemon** para recarga automática en desarrollo
- **JSON Server** para simular APIs locales

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

## 🏗️ Arquitectura del Proyecto

```
03_node_ts/
├── src/
│   ├── domain/                 # Lógica de negocio
│   │   └── use-cases/
│   │       └── checks/         # Casos de uso de verificación
│   │           └── check.service.ts
│   ├── presentation/           # Capa de presentación
│   │   ├── cron/              # Servicios de cron
│   │   │   └── cron.service.ts
│   │   └── server.ts          # Configuración principal
│   └── app.ts                 # Punto de entrada
├── assets/
│   └── db.json               # Datos para JSON Server
├── test/                     # Archivos de prueba
├── dist/                     # Código compilado JavaScript
├── jest.config.ts           # Configuración de Jest
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias y scripts
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

## 🔧 Funcionalidades del Sistema NOC

### Monitoreo de Endpoints

El sistema verifica automáticamente el estado de diferentes endpoints:

1. **Google** - Cada 10 segundos
2. **Múltiples APIs externas** - Cada 15 segundos:
   - GitHub API (usuario octocat)
   - JSONPlaceholder (posts)
   - HTTPBin (status check)
3. **Servicio local** - Cada 30 segundos:
   - Endpoint local en `http://localhost:3000/users`

### Servicios Principales

#### CheckService
```typescript
// Servicio para verificar disponibilidad de endpoints
class CheckService {
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly timeoutMs: number = 3000
    ) {}
    
    async execute(url: string): Promise<boolean>
}
```

#### CronService
```typescript
// Servicio para crear y gestionar tareas programadas
class CronService {
    static createJob(cronTime: string, onTick: () => void): CronJob
}
```

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
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js",
  "dev:tsc": "tsc --watch",
  "dev:nodemon": "nodemon dist/app.js",
  "dev": "tsnd --respawn --clear src/app.ts",
  "json-server": "json-server --watch assets/db.json --port 3000",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

## 🚀 Ejecución del Sistema

### Iniciar Sistema NOC Completo

```bash
# Terminal 1: Iniciar servidor JSON local
npm run json-server

# Terminal 2: Iniciar sistema de monitoreo
npm run dev
```

### Compilar para Producción

```bash
npm run build
```

### Iniciar Servidor de Producción

```bash
npm start
```

## 📊 Monitoreo en Acción

El sistema mostrará en consola:

```
Iniciando aplicación...
Server started...
🔍 Verificando endpoints...
✅ https://api.github.com/users/octocat responde correctamente
✅ https://jsonplaceholder.typicode.com/posts/1 responde correctamente
✅ https://httpbin.org/status/200 responde correctamente
🟢 Servicio local funcionando
```

## 🧪 Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch (se reinician automáticamente)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

## 📊 Reporte de Cobertura

Los tests generan un reporte de cobertura en la carpeta `coverage/`. Abre `coverage/lcov-report/index.html` en tu navegador para ver el reporte detallado.

## 🔍 Depuración

Los source maps están habilitados, lo que permite depurar el código TypeScript directamente en tu IDE o en las herramientas de desarrollo del navegador.

## 📚 Dependencias Principales

### Producción
- **axios** - Cliente HTTP para solicitudes
- **cron** - Gestión de tareas programadas
- **winston** - Logging estructurado
- **json-server** - API REST falsa para desarrollo
- **uuid** - Generación de identificadores únicos
- **yargs** - Parseo de argumentos de línea de comandos

### Desarrollo
- **typescript** - Compilador TypeScript
- **ts-node-dev** - Ejecución TypeScript con recarga automática
- **jest** - Framework de pruebas
- **ts-jest** - Integración TypeScript + Jest
- **nodemon** - Recarga automática en desarrollo

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para detalles.
