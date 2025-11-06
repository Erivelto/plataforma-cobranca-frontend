# 🚀 AWS Deployment Guide - Plataforma de Cobrança

## 📋 Resumo das Opções

### 🥇 **Opção 1: AWS Amplify (RECOMENDADA)**
- **Custo**: Gratuito por 12 meses + tier permanente
- **Complexidade**: ⭐⭐ (Simples)
- **Features**: Build automático, CD/CI, SSL, CDN, domínio
- **Ideal para**: Deploy rápido e completo

### 🥈 **Opção 2: AWS Elastic Beanstalk**
- **Custo**: Gratuito por 12 meses (t3.micro)
- **Complexidade**: ⭐⭐⭐ (Médio)
- **Features**: Node.js completo, auto-scaling, load balancer
- **Ideal para**: Aplicações full-stack

### 🥉 **Opção 3: S3 + CloudFront**
- **Custo**: Quase gratuito permanente
- **Complexidade**: ⭐⭐⭐⭐ (Avançado)
- **Features**: CDN global, alta performance
- **Ideal para**: Sites estáticos/SPA

## 🎯 **Recomendação para seu projeto**

Como sua aplicação tem **frontend React + backend Node.js**, recomendo:

### Para teste rápido → **AWS Amplify**
### Para produção → **Elastic Beanstalk**

## ⚡ **Quick Start: AWS Amplify**

1. **Push seu código para GitHub/GitLab**
2. **Acesse AWS Amplify Console**
3. **Conecte seu repositório**
4. **Configure build**: Use o `amplify.yml` já criado
5. **Deploy automático**

## 💰 **Custos do Tier Gratuito**

| Serviço | Limite Gratuito | Duração |
|---------|----------------|---------|
| Amplify | 1000 min build/mês + 15GB hosting | 12 meses |
| Elastic Beanstalk | t3.micro instance | 12 meses |
| S3 | 5GB storage + 20k requests | 12 meses |
| CloudFront | 50GB/mês + 2M requests | 12 meses |

## 🔧 **Setup Inicial AWS**

```powershell
# 1. Instalar AWS CLI
winget install Amazon.AWSCLI

# 2. Configurar credenciais
aws configure

# 3. Verificar
aws sts get-caller-identity
```

## 📞 **Próximos Passos**

Qual opção você gostaria de implementar primeiro? Posso criar os scripts de automação específicos!