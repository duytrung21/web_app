@echo off
title Web App Runner
cd /d "%~dp0"

:: Check if node_modules exists, if not run npm install
if not exist node_modules (
    echo Node modules not found. Installing dependencies...
    call npm install
)

echo Starting the development server...
call npm start
pause
