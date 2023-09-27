const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(3000, () => {
  console.log('Connected To Port: 3000')
})
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

client.login(token);

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
