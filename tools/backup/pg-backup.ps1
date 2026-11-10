# Wave 9 — pg_dump ساده (Windows / PostgreSQL client)
param(
  [string]$DatabaseUrl = $env:DATABASE_URL,
  [string]$OutDir = ".\backups"
)

if (-not $DatabaseUrl) {
  Write-Error "DATABASE_URL required"
  exit 1
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$out = Join-Path $OutDir "erp-$stamp.dump"
pg_dump $DatabaseUrl -Fc -f $out
Write-Host "Backup written: $out"
