require('dotenv').config();
const express = require('express')
const Discord = require("discord.js")
const cors = require("cors")
const client = new Discord.Client({
  intents:[
    Discord.GatewayIntentBits.Guilds, 
    Discord.GatewayIntentBits.GuildMessages, 
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessageTyping
  ]
})

const channelId = process.env.CHANNEL
const app = express()
app.use(cors())

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}! ${client.eventNames()}`)
})






client.on("messageCreate",(msg)=>{
  console.log("content",msg.content)
  
  if(msg.content === "ping"){
    msg.reply("pong")
  }
})


client.on("message", msg => {
  console.log("msg")
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

app.get('/test-point', async (req,res)=>{
  
  const messageContent = "Test endpoint is working"
  const channel  = client.channels.cache.get(channelId)
  if(channel){
    await channel.send(messageContent)
    res.status(200).send("Ok")
  }else{
    res.status(404).send('Not found')
  }
})

app.get('/xrp-usdt',async (req, res)=>{
  const {type, price} = req.query
  const channel  = client.channels.cache.get(channelId)
  const signalType = type === "buy" ? "Long" : "Short"
  const messageContent = `${type} signal, suggest open ${signalType} position. Current price: $${price}`
  if(channel){
    await channel.send(messageContent)
    res.status(200).send("Ok")
  }else{
    res.status(404).send('Not found')
  }


})

app.listen(3001, ()=>{
  console.log("Server running on port 3001")
  client.login(process.env.TOKEN)
})
