# Backend Node.js con TypeScript - Generador de Tablas de Multiplicar

Proyecto de backend construido con Node.js y TypeScript que implementa una **Clean Architecture** para generar tablas de multiplicar. Configurado con un entorno de desarrollo robusto incluyendo pruebas automatizadas con Jest.

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue los principios de **Clean Architecture** y **Domain-Driven Design (DDD)**:

### 📁 Estructura por Capas

```
src/
├── domain/                 # Capa de Dominio (lógica de negocio pura)
│   └── use-cases/         # Casos de uso específicos
│       ├── create-table.use-case.ts    # Genera tablas de multiplicar
│       └── save-file.use-case.ts      # Persistencia de archivos
├── presentation/           # Capa de Presentación
│   └── server-app.ts      # Orquestador principal
├── config/                # Configuración
│   └── plugins/
│       └── args.plugins.ts # Manejo de argumentos CLI con yargs
├── app.ts                 # Punto de entrada principal
└── app.logic.ts           # Implementación alternativa directa
```

### 🎯 Patrones Implementados

- **Use Cases**: Cada clase implementa una interfaz específica
- **Dependency Injection**: Constructor preparado para inyección de dependencias
- **Single Responsibility**: Cada clase tiene una única responsabilidad
- **Interface Segregation**: Interfaces específicas para cada caso de uso

### 🔄 Flujo de Datos

1. `app.ts` → obtiene argumentos via `yargs`
2. `ServerApp.run()` → orquesta los casos de uso
3. `CreateTable.execute()` → genera la tabla (lógica de negocio pura)
4. `SaveFile.execute()` → persiste el resultado (sin conocer la lógica)

## 🚀 Características

- **TypeScript** para tipado estático y mejor experiencia de desarrollo
- **Clean Architecture** con separación clara de responsabilidades
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

## 📦 Scripts Disponibles

```json
{
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js",
  "dev:tsc": "tsc --watch",
  "dev:nodemon": "nodemon src/app.ts",
  "dev": "npx ts-node src/app.ts",
  "dev:logic": "npx ts-node src/app.logic.ts --base 15 -s false",
  "dev:logic1": "npx ts-node src/app.logic.ts --base 15 -s",
  "dev:logic2": "npx ts-node src/app.logic.ts --base 15 -s -l 5",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

## 🎮 Uso del Proyecto

### Generar Tabla de Multiplicar

```bash
# Ejecutar con valores por defecto (base=5, limit=10)
npm run dev

# Personalizar parámetros
npm run dev --base 7 -s -l 5 -n tabla-personalizada -d outputs

# Usar la implementación directa (sin Clean Architecture)
npm run dev:logic
```

### Parámetros Disponibles

- `--base, -b`: Base de la tabla de multiplicar (default: 5)
- `--limit, -l`: Límite de la tabla (default: 10)
- `--show, -s`: Mostrar tabla en consola (default: false)
- `--name, -n`: Nombre del archivo (default: 'multiplication-table')
- `--destination, -d`: Directorio de salida (default: 'outputs')

## ✅ Evidencia de Funcionamiento

### 1. Ejecución Exitosa

```bash
npm run dev --base 5 -s
```

**Salida esperada:**
```
Inicio programa
Server running...
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
File created!
Fin programa
```

**Proceso verificado:**
- ✅ Muestra "Inicio programa"
- ✅ Ejecuta `ServerApp.run()`
- ✅ Genera la tabla del 5
- ✅ Crea el archivo correctamente
- ✅ Muestra "Fin programa"

### 2. Archivos Creados en `/outputs`

```
outputs/
├── multiplication-table.txt  # (último ejecutado)
├── tabla-5.txt              # Tabla del 5
└── tabla-15.txt             # Tabla del 15
```

### 3. Contenido del Archivo Generado

```txt
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
```

## ⚙️ Configuración de TypeScript

El archivo `tsconfig.json` está configurado con las siguientes opciones clave:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "rootDir": "src",
    "outDir": "dist/",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "ignoreDeprecations": "6.0"
  }
}
```

## 🔧 Desarrollo

### Iniciar Servidor de Desarrollo

```bash
# Con recarga automática
npm run dev:nodemon

# Compilación en modo watch
npm run dev:tsc

# Ejecución directa
npm run dev
```

### Compilar para Producción

```bash
npm run build
npm start
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

## 📊 Reporte de Cobertura

Los tests generan un reporte de cobertura en la carpeta `coverage/`. Abre `coverage/lcov-report/index.html` en tu navegador para ver el reporte detallado.

## 🧪 Ejemplos de Tests

El proyecto incluye tests para:

- **CreateTable**: Generación de tablas de multiplicar
- **SaveFile**: Persistencia de archivos
- **ServerApp**: Orquestación de casos de uso

## 🔍 Depuración

Los source maps están habilitados, lo que permite depurar el código TypeScript directamente en tu IDE.

## 📚 Conceptos Aprendidos

### Clean Architecture
- **Separación de responsabilidades**: Cada capa tiene un propósito específico
- **Dependency Inversion**: Las capas externas dependen de las internas
- **Single Responsibility**: Cada clase tiene una única razón para cambiar

### TypeScript
- **Tipado estático**: Prevención de errores en tiempo de compilación
- **Interfaces**: Contratos claros entre componentes
- **Modularidad**: Organización del código en módulos cohesivos

### Node.js
- **Manejo de archivos**: Sistema de archivos con `fs`
- **Argumentos CLI**: Procesamiento de línea de comandos con `yargs`
- **Procesos asíncronos**: Manejo de operaciones I/O

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para detalles.
