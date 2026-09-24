# Anthoor 360 - PowerShell Startup Script
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "    Starting ANTHOOR 360 Full-Stack Platform       " -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$root = $PSScriptRoot

# 1. Start Backend in separate window
Write-Host "[1/2] Starting Django Backend on http://127.0.0.1:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; python manage.py runserver 127.0.0.1:8000"

# 2. Start Frontend in separate window
Write-Host "[2/2] Starting React Vite Frontend on http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

# 3. Open Browser
Start-Sleep -Seconds 3
Start-Process "http://localhost:5173/"

Write-Host "Done! Web portal opened at http://localhost:5173/" -ForegroundColor Green
