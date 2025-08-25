# PowerShell script to start both Angular and AngularJS applications
Write-Host "Starting AngularJS 1.4.9 and Angular 20 Applications..." -ForegroundColor Green

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

# Start AngularJS app in background
Write-Host "Starting AngularJS 1.4.9 app on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd angularjs-1.4.9; npm run serve" -WindowStyle Minimized

# Wait a moment for the server to start
Start-Sleep -Seconds 3

# Check if AngularJS server started
if (Test-Port -Port 3000) {
    Write-Host "✓ AngularJS app is running on http://localhost:3000" -ForegroundColor Green
} else {
    Write-Host "⚠ AngularJS app may still be starting..." -ForegroundColor Yellow
}

# Start Angular 20 app
Write-Host "Starting Angular 20 app..." -ForegroundColor Yellow
cd angular-20
npm start

Write-Host "Both applications should now be running!" -ForegroundColor Green
Write-Host "AngularJS: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Angular 20: http://localhost:4200" -ForegroundColor Cyan