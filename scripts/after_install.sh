#!/bin/bash

source ~/.bashrc
source ~/.bash_profile

node -v
echo $PATH

echo "diridou"
cd /var/www/html/
pwd

npm install --production
npm run migrate

echo "after install collect"

# ls -l
# source /home/ec2-user/.bash_profile
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# nvm install v16.17.1
# nvm use v16.17.1

# rm -rf node_modules/
# npm install --unsafe-perm

# node server.js
# echo "before run forever"
# forever list
# npm run startforever
# echo "after run forever"
# forever list