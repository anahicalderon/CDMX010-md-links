const { readFileSync } = require("fs");
const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("./node_modules/markdown-link-extractor");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { questionPath } = require("readline-sync");

function captureLinks(course) {
  let markdown = readFileSync(course, "utf8");
  const links = markdownLinkExtractor(markdown);
  return links;
}

function validation(course) {
  const links = captureLinks(course);
  const filtro = links.filter((name) => name.includes("http"));
  filtro.forEach((item) => {
    fetch(item)
      .then(function (response) {
        if (response.status == 200) {
          console.log(
            chalk.rgb(223, 41, 53).bold(`<*>Ruta: ` + course) +
              chalk.cyanBright(`\n--> Link: ` + item) +
              chalk.magentaBright(`\n--> Status: ` + response.status) +
              chalk.rgb(223, 160, 110)(`\n--> Output: OK`) +
              `\n-------------------------------------------`
          );
        } else {
          console.log(
            chalk.rgb(223, 41, 53).bold(`<*> Ruta: ` + course) +
              chalk.cyanBright(` \n--> Link: ` + item) +
              chalk.magentaBright(` \n--> Status: ` + response.status) +
              chalk.rgb(223, 160, 110)(` \n--> Output: FAIL`) +
              `\n-------------------------------------------`
          );
        }
      })
      .catch((error) => console.log(error));
  });
  return chalk.hex("#FFBC0A")("validando...");
}

function stats(course) {
  const links = captureLinks(course);
  const filtro = links.filter((name) => name.includes("http"));
  console.log(chalk.rgb(223, 41, 53)(`--> Total: ` + filtro.length));
  const unique = [...new Set(filtro)];
  console.log(chalk.cyanBright(`--> Unique: ` + unique.length));
  return chalk.hex("#FFBC0A")("Listo!!");
}

function statsValidate(course) {
  const links = captureLinks(course);

  const filtro = links.filter((name) => name.includes("http"));
  console.log(chalk.rgb(223, 41, 53)(`--> Total: ` + filtro.length));
  const unique = [...new Set(filtro)];
  console.log(chalk.cyanBright(`--> Unique: ` + unique.length));
  filtro.forEach((item) => {
    fetch(item)
      .then(function (response) {
        if (response.status != 200) {
          const status = [response.status];
          console.log(chalk.hex("#C200FB")(`--> Broken: ` + status.length));
        }
      })
      .catch((error) => console.log(error));
  });
  return chalk.hex("#FFBC0A")("Espere tantito...");
}

function recursion(course) {
  const stat = fs.statSync(course);
  const statsObj = stat.isDirectory();
  console.log(statsObj);
  if (statsObj === true) {
    console.log("soy un directorio");
    fs.readdir(course, function (err, files) {
      if (err) {
        onerror(err);
        return;
      }
      console.log(files);
    });
  }
}

module.exports = {
  validation,
  stats,
  statsValidate,
  recursion,
};
