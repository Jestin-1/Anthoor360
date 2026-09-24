@echo off
echo ===================================================
echo     Starting ANTHOOR 360 Full-Stack Platform
echo ===================================================
echo.

:: Start Django REST Backend in a new window
echo [1/2] Launching Django Backend at http://127.0.0.1:8000 ...
start "Anthoor 360 - Django Backend" cmd /k "cd /d %~dp0backend && python manage.py runserver 127.0.0.1:8000"

:: Start Vite React Frontend in a new window
echo [2/2] Launching React Frontend at http://localhost:5173 ...
start "Anthoor 360 - React Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

:: Open the browser automatically
timeout /t 3 /nobreak >nul
start http://localhost:5173/

echo.
echo Both servers are starting up!
echo Frontend: http://localhost:5173/
echo Backend:  http://127.0.0.1:8000/api/v1/
echo.
