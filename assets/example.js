const fs = require("fs");
const path = require("path");
const { readFileSync } = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");

//Leer contenido textual de README

const fileMd = fs.readFileSync("README.md").toString();

// console.log(fileMd)

//Mostrar tipo de archivo de README

const pathName = path.extname("README.md");

// console.log('Este archivo tiene la extension: ' + pathName)

// Listar contenido del directorio README

const markdown = readFileSync("README.md", { encoding: "utf8" });

const links = markdownLinkExtractor(markdown);

links.forEach((link) => {
  console.log(link);
});

// Detectar si es un archivo o una carpeta

const statsObj = fs.statSync("README.md");

console.log(statsObj);
console.log("Path is File: ", statsObj.isFile());
console.log("Path is Directory: ", statsObj.isDirectory());

// Mostrar si es un directorio

const filenames = fs.readdirSync("./node_modules");

console.log("\nCurrent directory filenames: ");
filenames.forEach((file) => {
  console.log(file);
});

fileObjs = fs.readdirSync("README.md", { withFileTypes: true });
console.log("\nCurrent directory files: ");
fileObjs.forEach((file) => {
  console.log(file);
});
