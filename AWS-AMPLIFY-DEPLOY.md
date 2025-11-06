# 🚀 AWS Amplify - Guia Completo de Deploy

## 📋 Pré-requisitos Concluídos ✅

- ✅ AWS CLI instalado e configurado
- ✅ `amplify.yml` configurado para build
- ✅ Scripts de automação criados
- ✅ Variáveis de ambiente configuradas

## 🎯 Deploy em 5 Passos Simples

### 1️⃣ **Push para GitHub/GitLab**

```powershell
# Se ainda não tem repositório remoto
git remote add origin https://github.com/SEU-USUARIO/plataforma-cobranca-frontend.git

# Push do código
git add .
git commit -m "Setup AWS Amplify deployment"
git push -u origin main
```

### 2️⃣ **Acessar AWS Amplify Console**

1. Acesse: [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Clique em **"Host your web app"**
3. Selecione **GitHub** ou **GitLab**
4. Autorize a conexão com sua conta

### 3️⃣ **Conectar Repositório**

1. Selecione seu repositório: `plataforma-cobranca-frontend`
2. Branch: `main`
3. Clique em **"Next"**

### 4️⃣ **Configurar Build**

1. **App name**: `plataforma-cobranca`
2. **Environment**: `production`
3. O arquivo `amplify.yml` será detectado automaticamente ✅
4. **Build and test settings**: Usar amplify.yml
5. Clique em **"Next"**

### 5️⃣ **Review e Deploy**

1. Revisar configurações
2. Clique em **"Save and deploy"**
3. ⏳ Aguardar build (3-5 minutos)
4. 🎉 Aplicação disponível!

## 🔧 **Configurações Avançadas**

### 🌐 **Domínio Personalizado**

```powershell
# Via AWS CLI
aws amplify create-domain-association --app-id YOUR_APP_ID --domain-name seudominio.com
```

### 🔒 **Variáveis de Ambiente**

No console Amplify:
1. Acesse sua app
2. **Environment variables**
3. Adicionar as variáveis do `.env.production`

### 📊 **Monitoramento**

```powershell
# Usar o script de monitoramento
.\monitor-amplify.ps1 -AppId YOUR_APP_ID
```

## 🎯 **URLs Importantes**

| Recurso | URL |
|---------|-----|
| **Amplify Console** | https://console.aws.amazon.com/amplify/ |
| **Sua App** | https://main.YOUR_APP_ID.amplifyapp.com |
| **Documentação** | https://docs.aws.amazon.com/amplify/ |

## 🚨 **Troubleshooting**

### ❌ **Build Falhou**
```powershell
# Verificar logs no console ou via CLI
aws amplify get-job --app-id YOUR_APP_ID --branch-name main --job-id JOB_ID
```

### ❌ **Erro de Dependências**
- Verificar `package.json` está correto
- Confirmar `amplify.yml` aponta para comandos corretos

### ❌ **Problema de Permissões**
- Verificar IAM role do Amplify tem permissões necessárias
- Recriar service role se necessário

## 💰 **Custos (Tier Gratuito)**

| Recurso | Limite Gratuito | Período |
|---------|----------------|---------|
| **Build time** | 1000 minutos/mês | 12 meses |
| **Hosting** | 15GB/mês | 12 meses |
| **Data transfer** | 15GB/mês | 12 meses |
| **Requests** | 200k/mês | 12 meses |

## 🎉 **Próximos Passos**

1. **Deploy inicial**: Seguir os 5 passos acima
2. **Configurar CI/CD**: Commits automáticos = deploys automáticos
3. **Domínio personalizado**: Configurar seu próprio domínio
4. **Monitoramento**: Usar script de monitoramento
5. **Otimização**: Revisar performance e custos

---

## 🆘 **Suporte**

Em caso de problemas:
1. Executar `.\setup-amplify.ps1` novamente
2. Verificar logs no console AWS
3. Consultar documentação oficial
4. Usar o script de monitoramento para diagnóstico