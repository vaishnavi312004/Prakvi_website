$ErrorActionPreference = 'Stop'

$phpCommand = Get-Command php -ErrorAction SilentlyContinue
if ($phpCommand) {
    $phpExe = $phpCommand.Source
} else {
    $phpExe = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\PHP.PHP.*" `
        -Filter php.exe -Recurse -ErrorAction SilentlyContinue |
        Select-Object -First 1 -ExpandProperty FullName
}

if (-not $phpExe) {
    throw 'PHP was not found. Open a new terminal after installing PHP, then try again.'
}

$phpDirectory = Split-Path -Parent $phpExe
$projectRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $projectRoot '.env'
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*(DB_HOST|DB_PORT|DB_NAME|DB_USER|DB_PASSWORD|VITE_TURNSTILE_SITE_KEY|TURNSTILE_SECRET_KEY|SMTP_HOST|SMTP_PORT|SMTP_USER|SMTP_PASSWORD|CONTACT_EMAIL_FROM|CONTACT_EMAIL_TO)\s*=\s*(.*?)\s*$') {
            $value = $Matches[2].Trim('"').Trim("'")
            [Environment]::SetEnvironmentVariable($Matches[1], $value, 'Process')
        }
    }
}

& $phpExe -d "extension_dir=$phpDirectory\ext" -d extension=pdo_mysql `
    -S 127.0.0.1:8000 (Join-Path $PSScriptRoot 'router.php')
