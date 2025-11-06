# AWS Elastic Beanstalk Deployment Guide

## Pré-requisitos
1. Conta AWS com tier gratuito
2. AWS CLI instalado
3. EB CLI instalado

## Instalação do EB CLI
```powershell
# Via pip
pip install awsebcli --upgrade --user

# Ou via chocolatey
choco install awsebcli
```

## Deploy Steps

### 1. Preparar o projeto
```powershell
# Instalar dependências
npm install

# Build do projeto
npm run build
```

### 2. Inicializar Elastic Beanstalk
```powershell
# Na raiz do projeto
eb init

# Seguir os prompts:
# - Região: us-east-1 (mais barata)
# - Aplicação: plataforma-cobranca
# - Plataforma: Node.js
# - Versão: Node.js 18+
```

### 3. Criar ambiente
```powershell
# Criar ambiente gratuito
eb create plataforma-cobranca-prod --instance-type t3.micro --platform-version "Node.js 18 running on 64bit Amazon Linux 2"
```

### 4. Deploy
```powershell
eb deploy
```

### 5. Abrir aplicação
```powershell
eb open
```

## Configuração para produção
- Ambiente: production
- Instância: t3.micro (tier gratuito)
- Auto Scaling: desabilitado
- Load Balancer: Application Load Balancer (gratuito)

## Monitoramento
```powershell
# Ver logs
eb logs

# Status
eb status

# SSH (se necessário)
eb ssh
```

## Cleanup
```powershell
# Remover ambiente (para economizar)
eb terminate plataforma-cobranca-prod
```