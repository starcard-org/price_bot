# Install ![alt text](https://images-cc.rally.io/images/rly_token/rly-t-pupple.png) price_bot on any discord server

Use link below to install the creatorcoin_pricebot with the purple RLY logo on your discord server

https://discord.com/api/oauth2/authorize?client_id=790659705839157289&permissions=0&scope=bot

The bot doesn't require any permission because it only changes it's own nickname.

# bot commands

```!setcoin <CREATOR_COIN_SYMBOL>```

eg !setcoin PRO

```!setcoin```

with no arguments, resets everything and by default it fetches the RLY price from uniswap.

```!set_pricebot_nickname PRO ${priceInUSD} ${priceInRLY}```

${priceInUSD} and ${priceInRLY} are variables that can be used to display Creator Coin prices for the bot's nickname.

eg !set_pricebot_nickname My name is Alex, PRO coin in ${priceInUSD}, ${priceInRLY} RLY

# Custom bot - to set avatar

To replace the purple bot RLY Avatar, you need to run your bot/server

```!set_pricebot_avatar <some https:// url to an avatar png, gif, jpg image>```

This requires setting CUSTOM_BOT to true in the .env file and running your own server with instructions below:

# Instructions on running a discord bot in AWS 

Assumes some AWS ec2 knowledge

It's possible to use the smallest instance since bot use little resources

# install node

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

Quicker to use these commands:

```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash```

```nvm install 14.15.0```

Need a later version of node to use discord.js v12

# install yarn

then install yarn (https://tecadmin.net/install-yarn-centos/ using step 2)

```curl -o- -L https://yarnpkg.com/install.sh | bash```

# install pm2 

After yarn is installed use yarn to add pm2

```yarn global add pm2```

PM2 is a simple process manager that will restart your node process if it crashes so your bot stays up

# RUN everything:

put code in aws instance or a server somewhere, scp or rsync, to the server - it's like 2 files (price_bot.js and package.json)

Go into the folder where price_bot.js and package.json is at:

```yarn install```

Remember... to create a .env file in the folder, put your custom bot TOKEN there

Contents of .env file should look like this:
```
TOKEN=<YOUR_BOT_TOKEN_HERE>
CUSTOM_BOT=true
```
Then to run your bot: 

```pm2 start price_bot.js``` 
