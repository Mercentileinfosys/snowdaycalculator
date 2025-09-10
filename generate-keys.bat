@echo off
echo Snow Day Calculator - Premium Key Generator
echo ==========================================

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Generating 50 premium access keys...
echo.

node scripts/generate-premium-links.js bulk 50

echo.
echo Keys generated! Check the output above.
echo.
pause
