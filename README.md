# install price_bot on discord server

https://discord.com/api/oauth2/authorize?client_id=790659705839157289&permissions=0&scope=bot

To install the creatorcoin_pricebot with the purple rly logo as the avatar on your discord server

# bot commands

```!setcoin <CREATOR_COIN_SYMBOL>```

eg !setcoin PRO

```!setcoin```

with no arguments, resets everything and by default it fetches the RLY price from uniswap.

```!set_pricebot_nickname PRO ${priceInUSD} ${priceInRLY}```

${priceInUSD} and ${priceInRLY} are variables that can be used to display Creator Coin prices for the bot's nickname.

# if you run your own server, then can customize it a little more... 

```!set_pricebot_avatar <some https:// url to an avatar png, gif, jpg image>```

This requires setting CUSTOM_BOT to true in the .env file and running own server with instructions below:

# Basic instructions on running a discord bot in AWS 

Assumes ec2 setup knowledge and can launch and ssh into a ec2 instance / server

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

put code in aws instance, scp or rsync, to the server - it's like 2 files

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
