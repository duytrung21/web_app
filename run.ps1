# PowerShell script to run the Web App

Write-Host "Checking dependencies..." -ForegroundColor Cyan
if (-not (Test-Path -Path "node_modules")) {
    Write-Host "node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting the development server..." -ForegroundColor Green
npm start
