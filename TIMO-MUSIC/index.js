const express = require("express");///////////phantom ©
const app = express();///////////phantom ©

app.listen(() => console.log('phantom Bot Ready !'));

app.use('/ping', (req, res) => {
  res.send(new Date());///////////phantom ©
});

const Discord = require("discord.js");///////////phantom ©
const fs = require("fs");///////////phantom ©

const client = new Discord.Client();///////////phantom ©
const config = require("./config.js");
client.config = config;
client.queue = new Map()///////////phantom ©

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);///////////phantom ©
  files.forEach(file => {
    const event = require(`./events/${file}`);///////////phantom ©
    let eventName = file.split(".")[0];///////////phantom ©
    client.on(eventName, event.bind(null, client));
  });
});///////////phantom ©

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);///////////phantom ©
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];///////////phantom ©
    console.log(`${commandName} Is Ready Now..`);
    client.commands.set(commandName, props);
  });///////////phantom ©
});


client.login(config.token);