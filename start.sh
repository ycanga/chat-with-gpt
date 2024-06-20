#!/bin/bash

# Getting the API key from the user
read -p $'\e[33mEnter your OpenAI API key: \e[0m' api_key

# Specify the path to the config.js file
config_file="src/config.js"

# Replacing the old API key with the new key
sed -i.bak "s|let ApiKey = .*|let ApiKey = \"$api_key\";|" $config_file

echo $'\e[32mAPI key has been updated in\e[0m' $config_file

# Run the npm install command
echo $'\e[34mRunning npm install...\e[0m'
npm install

# Run the npm start command
echo $'\e[34mRunning npm start...\e[0m'
npm start
