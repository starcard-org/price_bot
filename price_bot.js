require('dotenv').config();
const Discord = require('discord.js')
const fetch = require('node-fetch')
const storage = require('node-persist')
const pollRate = 30000; // 30 secs

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const CUSTOM_BOT = new Boolean(process.env.CUSTOM_BOT === 'true').valueOf() // this should be false, unless a creator is running their own bot

bot.login(TOKEN);

// can do something fancy when bot joins a server, but... it's not doing anything
bot.on('guildCreate',(guild) => {
  // console.info(`Joined ${guild.name} and id: ${guild.id}!`);
  }
)

bot.on('ready', async () => {
  await storage.init()

  console.info(`Logged in as ${bot.user.tag}! polling every ${parseFloat(pollRate/1000)} secs, and CUSTOM_BOT set to `, CUSTOM_BOT);
  // On RLY discord, custom bot is set to false, so any discord server can use it (but you cannot customize the avatar)
  // but if you run your own bot, set it to true and go crazy...

  setInterval(pollCoinPrices, pollRate);
    
});

bot.on('message', msg => {
  const perms = msg.member.permissions;
  
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');
    console.log('author ', msg.author)

  } else if (msg.content.startsWith('!setcoin')) {
      
      if (!perms.has("ADMINISTRATOR")) {
        msg.author.send(`Please let admins set the coin for the server.`)
        return;
      } else {
        let coinsymbol = msg.content.split(' ')[1]
        if(coinsymbol){
          console.log('setcoin', coinsymbol)
          storage.setItem(msg.guild.id, coinsymbol)
        } else {
          storage.removeItem(msg.guild.id)
          storage.removeItem(msg.guild.id + '_bot_nickname')
          console.log('remove coinsymbol from ', msg.guild.id)
        }
      }     
  } else if (msg.content.startsWith('!set_pricebot_avatar')) {
    console.log('set_avatar_url')
    if (!perms.has("ADMINISTRATOR")) {
      msg.author.send(`Please let admins set the avatar for me.`)
      return;
    } else {
      let coin_avatar_url = msg.content.split(' ')[1]
      console.log("set_bot_avatar url", coin_avatar_url)
      if(coin_avatar_url && CUSTOM_BOT)
        bot.user.setAvatar(coin_avatar_url)
      else
        console.log("do nothing")
    }

  } else if (msg.content.startsWith('!set_pricebot_nickname')) {
    console.log('set_pricebot_nickname')
    if (!perms.has("ADMINISTRATOR")) {
      msg.author.send(`Please let admins set the nickname for me.`)
      return;
    } else {
      let coin_avatar_nickname = msg.content.substring('!set_pricebot_nickname '.length)
      if(coin_avatar_nickname){
        storage.setItem(msg.guild.id + '_bot_nickname', coin_avatar_nickname)
      } else {
        console.log('remove ' + msg.guild.id + '_bot_nickname')
        storage.removeItem(msg.guild.id + '_bot_nickname')
      }
    }
  }
});


const pollCoinPrices = () => {
  bot.guilds.cache.each(guild => { 
    storage.getItem(guild.id).then(coinsymbol => {
      if(coinsymbol && coinsymbol.toLowerCase() !== 'rly'){
        let symbol = new String(coinsymbol).toLowerCase()
        fetch(`https://api.rally.io/v1/creator_coins/${symbol}/price`)
          .then(res => res.json())
          .then(json => {
            let priceInUSD = parseFloat(json.priceInUSD).toFixed(2)
            let priceInRLY = parseFloat(json.priceInRLY).toFixed(2)
            if(json.errorMessage) 
              guild.me.setNickname('Error: ' + json.errorMessage)
            else {
              storage.getItem(guild.id + '_bot_nickname').then(nickmessage =>{
                if(nickmessage){
                  let template = eval('`' + nickmessage + '`')
                  guild.me.setNickname(template)
                } else {
                  guild.me.setNickname(`${symbol.toUpperCase()}: $${parseFloat(priceInUSD).toFixed(3)} | ${priceInRLY} RLY`);
                }

              })
            
            }
          }
        );
      } else {
        // get $RLY usd price from uniswap via api.thegraph subgraph
        const graphql = JSON.stringify({
          query:`
          {
            pair(id: "0x27fd0857f0ef224097001e87e61026e39e1b04d1"){
                token0 {
                  id
                  symbol
                  name
                  derivedETH
                }
                token1 {
                  id
                  symbol
                  name
                  derivedETH
                }
                reserve0
                reserve1
                reserveUSD
                trackedReserveETH
                token0Price
                token1Price
                volumeUSD
                txCount
            }
             
            bundle(id: "1" ) {
              ethPrice
            }
           
           }
          `,
          variables: {}
        })
    

        const requestOptions = {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: graphql,
          redirect: 'follow'
        };

        fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", requestOptions)
          .then(response => response.json())
          .then(result => {
            let ethPrice = result.data.bundle.ethPrice
            let rlyUniPrice = parseFloat(result.data.pair.token0Price) * parseFloat(ethPrice)
            let rlyPrice = parseFloat(rlyUniPrice).toFixed(6)
            
            guild.me.setNickname(`RLY: $${rlyPrice}`)
          })
          .catch(error => console.log('error', error));
      }
    })
  })
}