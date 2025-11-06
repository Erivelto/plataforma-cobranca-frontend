# 📊 Monitoramento AWS Amplify

param(
    [Parameter(Mandatory=$false)]
    [string]$AppId = $env:AWS_APP_ID
)

Write-Host "📊 Monitorando AWS Amplify App..." -ForegroundColor Green

if (-not $AppId) {
    Write-Host "⚠️ App ID não informado. Configure a variável AWS_APP_ID ou passe como parâmetro." -ForegroundColor Yellow
    Write-Host "Exemplo: .\monitor-amplify.ps1 -AppId d1234567890abc" -ForegroundColor Cyan
    exit
}

function Show-AppStatus {
    Write-Host "`n🏗️ Status da aplicação:" -ForegroundColor Yellow
    try {
        $appInfo = aws amplify get-app --app-id $AppId | ConvertFrom-Json
        Write-Host "Nome: $($appInfo.app.name)" -ForegroundColor White
        Write-Host "Status: $($appInfo.app.platform)" -ForegroundColor White
        Write-Host "URL: https://$($appInfo.app.defaultDomain)" -ForegroundColor Blue
    } catch {
        Write-Host "❌ Erro ao obter informações da app" -ForegroundColor Red
    }
}

function Show-Deployments {
    Write-Host "`n🚀 Últimos deployments:" -ForegroundColor Yellow
    try {
        $branches = aws amplify list-branches --app-id $AppId | ConvertFrom-Json
        foreach ($branch in $branches.branches) {
            Write-Host "`nBranch: $($branch.branchName)" -ForegroundColor Cyan
            Write-Host "Status: $($branch.stage)" -ForegroundColor White
            Write-Host "Último deploy: $($branch.updateTime)" -ForegroundColor White
            
            # Jobs recentes
            $jobs = aws amplify list-jobs --app-id $AppId --branch-name $branch.branchName --max-results 3 | ConvertFrom-Json
            Write-Host "Jobs recentes:" -ForegroundColor Gray
            foreach ($job in $jobs.jobSummaries) {
                $status = $job.status
                $color = switch ($status) {
                    "SUCCEED" { "Green" }
                    "FAILED" { "Red" }
                    "RUNNING" { "Yellow" }
                    default { "White" }
                }
                Write-Host "  - $($job.jobId): $status" -ForegroundColor $color
            }
        }
    } catch {
        Write-Host "❌ Erro ao obter deployments" -ForegroundColor Red
    }
}

function Show-Logs {
    param([string]$JobId)
    Write-Host "`n📋 Logs do job ${JobId}:" -ForegroundColor Yellow
    try {
        aws amplify get-job --app-id $AppId --branch-name main --job-id $JobId
    } catch {
        Write-Host "❌ Erro ao obter logs" -ForegroundColor Red
    }
}

# Menu principal
do {
    Clear-Host
    Write-Host "📊 AWS Amplify - Monitoramento" -ForegroundColor Green
    Write-Host "App ID: $AppId" -ForegroundColor Cyan
    Write-Host "`n1. Status da aplicação"
    Write-Host "2. Deployments recentes"
    Write-Host "3. Trigger novo deploy"
    Write-Host "4. Abrir no browser"
    Write-Host "5. Configurações"
    Write-Host "0. Sair"
    
    $choice = Read-Host "`nEscolha uma opção"
    
    switch ($choice) {
        "1" { Show-AppStatus; Read-Host "`nPressione Enter para continuar" }
        "2" { Show-Deployments; Read-Host "`nPressione Enter para continuar" }
        "3" { 
            Write-Host "🚀 Iniciando novo deployment..." -ForegroundColor Yellow
            aws amplify start-deployment --app-id $AppId --branch-name main
            Write-Host "✅ Deploy iniciado!" -ForegroundColor Green
            Read-Host "Pressione Enter para continuar"
        }
        "4" {
            $appInfo = aws amplify get-app --app-id $AppId | ConvertFrom-Json
            $url = "https://$($appInfo.app.defaultDomain)"
            Start-Process $url
        }
        "5" {
            Write-Host "`n⚙️ Configurações úteis:" -ForegroundColor Yellow
            Write-Host "Console Amplify: https://console.aws.amazon.com/amplify/home?region=us-east-1#/$AppId" -ForegroundColor Blue
            Write-Host "Configurar domínio customizado:" -ForegroundColor Cyan
            Write-Host "aws amplify create-domain-association --app-id $AppId --domain-name seudominio.com" -ForegroundColor Gray
            Read-Host "`nPressione Enter para continuar"
        }
    }
} while ($choice -ne "0")

Write-Host "👋 Até mais!" -ForegroundColor Green