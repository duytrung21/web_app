#!/bin/bash

# Bash script to run the Web App
echo -e "\033[0;36mChecking dependencies...\033[0m"
if [ ! -d "node_modules" ]; then
    echo -e "\033[0;33mnode_modules not found. Installing dependencies...\033[0m"
    npm install
fi

echo -e "\033[0;32mStarting the development server...\033[0m"
npm start
