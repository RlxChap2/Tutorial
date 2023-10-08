const { Client, GatewayIntentBits, Events } = require("discord.js");
const { token, prefix } = require("./config.json");
const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
});
const { readdirSync } = require("node:fs");
readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
module.exports.Client = client;



// Dashboard
const express = require("express");
const app = express();
const ascii = require('ascii-table');
const cookieParser = require('cookie-parser');
const urlencodedParser = express.urlencoded({ extended: true });
const bodyParser = require('body-parser');
const path = require('path');
const table = new ascii("Website").setJustify();

app.enable('trust proxy');
app.set("etag", false);
app.set("views", __dirname);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "Dashboard")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(urlencodedParser);

const files = readdirSync("./Dashboard/DashHandler").filter((f) =>
  f.endsWith(".js")
);
files.forEach((f) => {
  try {
    const file = require(`./Dashboard/DashHandler/${f}`);
    if (file && file.name && file.run) {
      app.get(file.name, file.run);
      if (file.run2) {
        app.post(file.name, file.run2);
      }
      table.addRow(file.name, "🟢 Working");
    } else {
      table.addRow(file.name, "🔴 Not working");
    }
  } catch (error) {
    console.error(`Failed to load file ${f}:`, error);
    table.addRow(f, "🔴 Not working");
  }
});
console.log(table.toString());

app.listen(3000, () => {
  console.log(`Connected To Link: http://localhost:3000`);
  
});
//========================| ErrorsReturn |==============================
process.on("uncaughtException", (error) => {
  return console.error(error);
});

process.on("unhandledRejection", (error) => {
  return console.error(error);
});

process.on("rejectionHandled", (error) => {
  return console.error(error);
});
//======================================================================

client.login(token);
