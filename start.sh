# #!/bin/bash

# # Kullanıcıdan API anahtarını alma
# read -p $'\e[33mEnter your OpenAI API key: \e[0m' api_key

# # config.js dosyasının yolunu belirtin
# config_file="src/config.js"

# # Eski API anahtarını yeni anahtarla değiştirme
# sed -i.bak "s|let ApiKey = .*|let ApiKey = \"$api_key\";|" $config_file

# echo $'\e[32mAPI key has been updated in\e[0m' $config_file

#!/bin/bash

# Kullanıcıdan API anahtarını alma
read -p $'\e[33mEnter your OpenAI API key: \e[0m' api_key

# config.js dosyasının yolunu belirtin
config_file="src/config.js"

# Eski API anahtarını yeni anahtarla değiştirme
sed -i.bak "s|let ApiKey = .*|let ApiKey = \"$api_key\";|" $config_file

echo $'\e[32mAPI key has been updated in\e[0m' $config_file

# npm install komutunu çalıştırma
echo $'\e[34mRunning npm install...\e[0m'
npm install

# npm start komutunu çalıştırma
echo $'\e[34mRunning npm start...\e[0m'
npm start
