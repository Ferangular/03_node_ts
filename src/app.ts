import { buildLogger } from "./plugins/logger-modificado.plugin";
import { httpClientPlugin } from "./plugins/http-client.plugin";

const logger = buildLogger('app');

async function main() {
  try {
    logger.info('Iniciando aplicación...');
    
    // Ejemplo de uso del cliente HTTP
    logger.info('Realizando petición HTTP a JSONPlaceholder...');
    const data = await httpClientPlugin.get('https://jsonplaceholder.typicode.com/todos/1');
    
    logger.info('Respuesta recibida exitosamente');
    logger.info(`Todo ID: ${data.id}, Title: ${data.title}, Completed: ${data.completed}`);
    
    logger.info('Aplicación finalizada correctamente');
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Error en la aplicación: ${errorMessage}`);
    process.exit(1);
  }
}

main();
