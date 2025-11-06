# Plataforma de Cobrança - Frontend

🚀 **Sistema de cobrança moderno** desenvolvido com React + TypeScript + Node.js

## 📋 Funcionalidades

- ✅ **Dashboard** completo com métricas
- ✅ **Gestão de pessoas** (clientes/fornecedores)
- ✅ **Sistema de cobranças**
- ✅ **Autenticação** segura
- ✅ **Interface responsiva** com shadcn/ui
- ✅ **PWA** (Progressive Web App)

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **UI**: shadcn/ui + Radix UI + Tailwind CSS
- **Roteamento**: Wouter
- **Build**: esbuild
- **Deploy**: AWS Amplify

## 🚀 Deploy

Este projeto está configurado para deploy automático no **AWS Amplify**.

### Acesso rápido:
- 📖 [Guia de Deploy AWS](./AWS-AMPLIFY-DEPLOY.md)
- ⚙️ [Configuração Amplify](./amplify.yml)
- 🔧 [Setup Automático](./setup-amplify.ps1)

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção local
npm start
```

## 📊 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build completo (frontend + backend)
- `npm run start` - Executar em produção
- `npm run aws:build` - Build otimizado para AWS
- `npm run preview` - Preview do build

## 🌐 Deploy na AWS

1. **Push para GitHub**
2. **Conectar no AWS Amplify**
3. **Deploy automático** a cada commit

### Custo: **100% GRATUITO** (tier gratuito por 12 meses)

## 📁 Estrutura do Projeto

```
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── hooks/
├── server/          # Backend Node.js
├── shared/          # Código compartilhado
└── amplify.yml      # Configuração AWS Amplify
```

## 🔧 Configuração

- Variables de ambiente em `.env.local` (desenvolvimento)
- Variables de produção em `.env.production` (AWS)
- Configuração do build em `amplify.yml`

## 📞 Suporte

Para dúvidas sobre deploy AWS, consulte:
- [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
- [Documentação AWS Amplify](https://docs.aws.amazon.com/amplify/)

---

**Desenvolvido com ❤️ para facilitar a gestão de cobranças**