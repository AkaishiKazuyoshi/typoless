#!/bin/bash

pwd

source ~/.bashrc
source ~/.bash_profile
node -v

echo "forever install"
npm install -g forever@v4.0.3

echo "forever list s"
forever list
echo "forever list f"

echo "forever stopall s"
forever stopall
echo "forever stopall f"

echo "forever list s"
forever list
echo "forever list f"

echo "before install collect"

# sudo apt-get install python-software-properties -y
# sudo apt-add-repository ppa:chris-lea/node.js -y
# sudo apt-get update
# sudo apt-get install nodejs -y

# sudo npm install forever -g
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# nvm install v16.17.1
# nvm use v16.17.1
# node -v