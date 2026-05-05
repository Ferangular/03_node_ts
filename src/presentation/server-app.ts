// Importamos los casos de uso del dominio (lógica de negocio)
// Estos son los componentes principales que contienen la lógica pura
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

/**
 * Interfaz que define las opciones de configuración para la aplicación
 * TypeScript nos ayuda con el tipado estático para evitar errores en tiempo de ejecución
 */
interface RunOptions {
  base: number;           // Base de la tabla de multiplicar
  limit: number;          // Límite de la tabla (cuántas filas generar)
  showTable: boolean;     // Si se debe mostrar la tabla en consola
  fileDestination: string; // Directorio donde se guardará el archivo
  fileName: string;       // Nombre del archivo a generar
}

/**
 * ServerApp - Clase principal de la aplicación (Capa de Presentación)
 * 
 * Esta clase actúa como un ORQUESTADOR que coordina los diferentes casos de uso
 * siguiendo el patrón de Arquitectura Limpia (Clean Architecture)
 * 
 * Responsabilidades:
 * - Coordinar la ejecución de los casos de uso
 * - Manejar el flujo principal de la aplicación
 * - NO contiene lógica de negocio (eso está en los use cases)
 */
export class ServerApp {

  /**
   * Método estático que ejecuta el flujo principal de la aplicación
   * 
   * @param options - Objeto con todas las configuraciones necesarias
   * 
   * Flujo de ejecución:
   * 1. Genera la tabla de multiplicar (CreateTable)
   * 2. Guarda el resultado en un archivo (SaveFile)
   * 3. Opcionalmente muestra la tabla en consola
   * 4. Reporta el estado de la operación
   */
  static run({ base, limit, showTable, fileDestination, fileName }: RunOptions) {
    console.log('Server running...');
    
    // Paso 1: Crear la tabla de multiplicar usando el caso de uso correspondiente
    // Inyectamos las dependencias directamente (en este caso no hay dependencias externas)
    const table = new CreateTable().execute({ base, limit });
    
    // Paso 2: Guardar la tabla en un archivo usando el caso de uso de persistencia
    // El patrón de encadenamiento hace el código más legible
    const wasCreated = new SaveFile()
      .execute({
        fileContent: table,        // Contenido a guardar (la tabla generada)
        fileDestination: fileDestination, // Destino del archivo
        fileName: fileName,        // Nombre del archivo
      });

    // Paso 3: Mostrar la tabla en consola si el usuario lo solicitó
    if (showTable) console.log(table);

    // Paso 4: Reportar el resultado de la operación de guardado
    // Usamos operador ternario para una sintaxis más concisa
    (wasCreated)
      ? console.log('File created!')    // Éxito: archivo creado correctamente
      : console.error('File not created!'); // Error: no se pudo crear el archivo
  }
}