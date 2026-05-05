@echo off
setlocal
cd /d "%~dp0"
echo Deploying MotionQuest to Vercel production...
npx vercel deploy --prod --yes
endlocal
