import {Server} from "./presentation/server";


(async() => {
  main();
})();


function main(){
  console.log('Iniciando aplicación...');
  Server.start();
}