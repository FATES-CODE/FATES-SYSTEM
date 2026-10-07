@echo off
chcp 65001 > nul
title FATES System GCP Auto Deployer
echo ==========================================
echo   FATES System GCP 원클릭 배포 진행 중...
echo ==========================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"
echo.
pause
