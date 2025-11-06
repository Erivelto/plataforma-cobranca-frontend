# 🚀 Setup AWS Amplify - Automação Completa

Write-Host "🎯 Configurando AWS Amplify para Plataforma de Cobrança..." -ForegroundColor Green

# Verificar se AWS CLI está instalado
Write-Host "`n📋 Verificando AWS CLI..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version
    Write-Host "✅ AWS CLI instalado: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI não encontrado. Instalando..." -ForegroundColor Red
    winget install Amazon.AWSCLI
    Write-Host "✅ AWS CLI instalado com sucesso!" -ForegroundColor Green
}

# Configurar credenciais AWS
Write-Host "`n🔐 Configuração das credenciais AWS" -ForegroundColor Yellow
Write-Host "Para continuar, você precisa das credenciais AWS do console:" -ForegroundColor Cyan
Write-Host "1. Acesse: https://console.aws.amazon.com/iam/home#/security_credentials" -ForegroundColor White
Write-Host "2. Clique em 'Chaves de acesso' > 'Criar chave de acesso'" -ForegroundColor White
Write-Host "3. Anote Access Key ID e Secret Access Key" -ForegroundColor White

$configure = Read-Host "`nDeseja configurar as credenciais agora? (s/n)"
if ($configure -eq 's' -or $configure -eq 'S') {
    aws configure
    Write-Host "✅ Credenciais configuradas!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Lembre-se de configurar com: aws configure" -ForegroundColor Yellow
}

# Verificar se o projeto tem git
Write-Host "`n📁 Verificando repositório Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Repositório Git encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️ Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit for AWS Amplify"
    Write-Host "✅ Git inicializado" -ForegroundColor Green
}

# Verificar build local
Write-Host "`n🔨 Testando build local..." -ForegroundColor Yellow
try {
    npm run aws:build
    Write-Host "✅ Build local funcionando!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro no build local. Verifique dependências:" -ForegroundColor Red
    npm install
}

Write-Host "`n🎉 Setup completo!" -ForegroundColor Green
Write-Host "`n📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Faça push do código para GitHub/GitLab" -ForegroundColor White
Write-Host "2. Acesse: https://console.aws.amazon.com/amplify/" -ForegroundColor White
Write-Host "3. Clique em 'Host your web app'" -ForegroundColor White
Write-Host "4. Conecte seu repositório" -ForegroundColor White
Write-Host "5. O arquivo amplify.yml será detectado automaticamente" -ForegroundColor White

Write-Host "`n🔗 Links úteis:" -ForegroundColor Cyan
Write-Host "AWS Amplify Console: https://console.aws.amazon.com/amplify/" -ForegroundColor Blue
Write-Host "Documentação: https://docs.aws.amazon.com/amplify/" -ForegroundColor Blue