const {
  validation,
  stats,
  statsValidate,
  recursion,
} = require("./function.js");
const interface = require("readline-sync");
const chalk = require("chalk");

const route = interface.question("Ingresa la url:");
recursion(route);
console.log(chalk.hex("#FFBC0A")("Estas son las opciones permitidas:"));
console.log(chalk.hex("#C200FB")("--validate"));
console.log(chalk.hex("#C200FB")("--stats"));
console.log(chalk.hex("#C200FB")("--validate & --stats"));
console.log(chalk.hex("#C200FB")("--Salir"));

let opc = interface.question("Que operacion deseas realizar?");
switch (opc) {
  case "--validate":
    process.stdout.write("\033c");
    console.log(validation(route));
    return opc;
    break;
  case "--stats":
    process.stdout.write("\033c");
    console.log(stats(route));
    break;
  case "--validate & --stats":
    process.stdout.write("\033c");
    console.log(statsValidate(route));
    break;
  case "--Salir":
    process.stdout.write("\033c");
    process.exit(1);
  default:
    console.log("No se ha ingresado una opcion valida");
    break;
}
