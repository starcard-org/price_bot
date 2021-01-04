# discord bot aws ec2 setup 

Using tiny smallest nano instance since bot use little resources

# install node

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

Quicker use these commands:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install 14.15.0

# install yarn

then install yarn (https://tecadmin.net/install-yarn-centos/ using step 2)

curl -o- -L https://yarnpkg.com/install.sh | bash

# install pm2

https://computingforgeeks.com/install-pm2-node-js-process-manager-on-rhel-centos-8/

or after yarn is installed use yarn to add pm2

yarn global add pm2

# RUN everything:

put code in aws instance, scp, rsync, to the server

Go in code folder run:

yarn install

pm2 start price_bot.js


# Some external dependencies
1) Discord bot token (put into .env file)
2) node-persist (to save stuff in local file so we don't need a db)


