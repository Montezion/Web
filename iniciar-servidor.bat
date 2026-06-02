@echo off
title Monte Zion - Servidor Local
echo.
echo  ================================================
echo    MONTE ZION - Servidor Local
echo  ================================================
echo.
echo  Iniciando servidor en http://localhost:8766
echo  Abri tu navegador en esa direccion.
echo.
echo  Para detener el servidor presiona Ctrl+C
echo  NO cierres esta ventana mientras lo uses.
echo.
cd /d "%~dp0"
npx serve . -l 8766
pause
