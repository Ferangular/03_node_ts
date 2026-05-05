import {yarg} from "./config/plugins/args.plugins";
import {ServerApp} from "./presentation/server-app";

// console.log(yarg.b)
// (async () => {

(async()=> {
    await main();
    console.log('Fin programa')
})();

async function main(){

    console.log('Inicio programa')

    const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg;


    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}


