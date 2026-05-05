import {CronService} from "./cron/cron.service";
import {CheckService} from "../domain/use-cases/checks/check.service";


export class Server {

    public static start() {

        console.log( 'Server started...' );


        CronService.createJob(
            '*/10 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.log( error ),
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );

            }
        );

        // Ejemplo: Verificar múltiples endpoints cada 15 segundos
        CronService.createJob(
            '*/15 * * * * *',
            async () => {
                const endpoints = [
                    'https://api.github.com/users/octocat',
                    'https://jsonplaceholder.typicode.com/posts/1',
                    'https://httpbin.org/status/200'
                ];

                console.log('🔍 Verificando endpoints...');

                for (const endpoint of endpoints) {
                    new CheckService(
                        () => console.log(`✅ ${endpoint} responde correctamente`),
                        (error) => console.log(`❌ ${endpoint} - Error: ${error}`)
                    ).execute(endpoint);
                }
            }
        );

        // Ejemplo: Monitorear servicio local cada 30 segundos
        CronService.createJob(
            '*/30 * * * * *',
            () => {
                const localUrl = 'http://localhost:3000/users';

                new CheckService(
                    () => console.log('🟢 Servicio local funcionando'),
                    (error) => console.log('🔴 Servicio local caído - ', error)
                ).execute(localUrl);
            }
        );

        CronService.createJob('*/15 * * * * *', async () => {
            const endpoints = [
                'https://api.github.com/users/octocat',
                'https://jsonplaceholder.typicode.com/posts/1',
                'https://httpbin.org/status/200'
            ];

            console.log('🔍 Verificando endpoints...');

            for (const endpoint of endpoints) {
                new CheckService(
                    ({ url, status, time }) =>
                        console.log(`✅ ${url} | ${status} | ${time}ms`),

                    (error) =>
                        console.log(`❌ ${error}`)
                ).execute(endpoint);
            }
        });


    }


}

