# bot commands

```!setcoin <CREATOR_COIN_SYMBOL>```

eg !setcoin PRO

```!setcoin```

with no arguments, resets everything

```!set_pricebot_nickname PRO ${priceInUSD} ${priceInRLY}```

${priceInUSD} and ${priceInRLY} are variables that can be used to display Creator Coin prices for the bot's nickname.

```!set_pricebot_avatar <some https:// url to an avatar png, gif, jpg image>```

This requires setting CUSTOM_BOT to true in the .env file and someone running their own discord bot with their own bot TOKEN

# Basic instructions on running a discord bot in AWS ec2 setup 

Using nano instance since bot use little resources - can be on free tier

# install node

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

Quicker use these commands:

```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash```

```nvm install 14.15.0```

Need a later version of node to use discord.js v12

# install yarn

then install yarn (https://tecadmin.net/install-yarn-centos/ using step 2)

```curl -o- -L https://yarnpkg.com/install.sh | bash```

# install pm2

After yarn is installed use yarn to add pm2

```yarn global add pm2```

# RUN everything:

put code in aws instance, scp, rsync, to the server

Go in code folder run:

```yarn install```

```pm2 start price_bot.js```


# Some external dependencies
1) Discord bot token (put into .env file) and set CUSTOM_BOT=true
2) node-persist (to save stuff in local file so we don't need a db)




