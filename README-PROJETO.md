# Plataforma de Cobrança - Frontend React PWA

## 📋 Descrição

Frontend React PWA completo para gerenciamento de cobranças e clientes, integrado com API RESTful usando autenticação JWT.

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Axios** - Cliente HTTP
- **Wouter** - Roteamento
- **date-fns** - Manipulação de datas
- **Lucide React** - Ícones

## ✨ Funcionalidades

### Autenticação
- ✅ Login com JWT
- ✅ Registro de novos usuários
- ✅ Refresh token automático
- ✅ Proteção de rotas
- ✅ Logout seguro

### Gestão de Pessoas
- ✅ Listagem de pessoas
- ✅ Cadastro de novas pessoas
- ✅ Edição de pessoas
- ✅ Exclusão de pessoas
- ✅ Busca por nome ou documento

### Gestão de Cobranças
- ✅ Listagem de cobranças
- ✅ Cadastro de novas cobranças
- ✅ Edição de cobranças
- ✅ Exclusão de cobranças
- ✅ Busca por descrição ou pessoa
- ✅ Status de cobrança (Pendente, Pago, Vencido, Cancelado)

### PWA (Progressive Web App)
- ✅ Manifest.json configurado
- ✅ Service Worker para cache offline
- ✅ Ícones otimizados (192x192 e 512x512)
- ✅ Instalável em dispositivos móveis
- ✅ Meta tags para mobile

### Design Responsivo
- ✅ Layout mobile-first
- ✅ Sidebar retrátil
- ✅ Cards responsivos
- ✅ Tabelas adaptativas
- ✅ Gradientes modernos

## 🔧 Configuração da API

A aplicação está configurada para se conectar à API:
```
https://controlepesssoalapi-d8g6bbhedcd3cvfk.eastus-01.azurewebsites.net
```

Para alterar a URL da API, edite o arquivo:
```typescript
client/src/lib/api.ts
```

## 📱 Estrutura do Projeto

```
client/
├── public/
│   ├── manifest.json          # Configuração PWA
│   ├── sw.js                  # Service Worker
│   ├── icon-192x192.png       # Ícone PWA 192x192
│   └── icon-512x512.png       # Ícone PWA 512x512
├── src/
│   ├── components/
│   │   ├── ui/                # Componentes shadcn/ui
│   │   ├── ErrorBoundary.tsx
│   │   └── ProtectedRoute.tsx # Proteção de rotas
│   ├── contexts/
│   │   ├── AuthContext.tsx    # Contexto de autenticação
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   └── api.ts             # Configuração Axios
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── Login.tsx          # Página de login
│   │   ├── Register.tsx       # Página de registro
│   │   ├── Dashboard.tsx      # Dashboard principal
│   │   ├── Pessoas.tsx        # Gestão de pessoas
│   │   └── Cobrancas.tsx      # Gestão de cobranças
│   ├── types/
│   │   └── api.ts             # Tipos TypeScript da API
│   ├── App.tsx                # Componente principal
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais
```

## 🎨 Design

### Paleta de Cores
- **Primary**: Azul (#6366f1)
- **Background**: Branco/Cinza claro
- **Gradientes**: Azul → Roxo → Rosa

### Componentes UI
Todos os componentes seguem o padrão shadcn/ui com Tailwind CSS, garantindo:
- Consistência visual
- Acessibilidade
- Responsividade
- Temas customizáveis

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Token) com as seguintes features:

1. **Login**: Envia credenciais e recebe token + refreshToken
2. **Interceptor**: Adiciona token automaticamente em todas as requisições
3. **Refresh**: Renova token automaticamente quando expira
4. **Logout**: Limpa tokens e redireciona para login
5. **Proteção**: Rotas protegidas redirecionam para login se não autenticado

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview
```

## 🌐 Endpoints da API

### Autenticação
- `POST /api/Autenticacao/login` - Login
- `POST /api/Autenticacao/register` - Registro
- `GET /api/Autenticacao/me` - Dados do usuário
- `POST /api/Autenticacao/refresh-token` - Renovar token
- `POST /api/Autenticacao/change-password` - Alterar senha
- `GET /api/Autenticacao/validate` - Validar token

### Pessoas
- `GET /api/Pessoa` - Listar todas
- `POST /api/Pessoa` - Criar nova
- `GET /api/Pessoa/{id}` - Obter por ID
- `PUT /api/Pessoa/{id}` - Atualizar
- `DELETE /api/Pessoa/{id}` - Excluir (soft delete)

### Cobranças
- `GET /api/PessoaCobranca` - Listar todas
- `POST /api/PessoaCobranca` - Criar nova
- `GET /api/PessoaCobranca/{id}` - Obter por ID
- `PUT /api/PessoaCobranca/{id}` - Atualizar
- `DELETE /api/PessoaCobranca/{id}` - Excluir (soft delete)

## 📱 PWA - Progressive Web App

### Instalação
1. Acesse a aplicação no navegador
2. Clique no ícone de instalação na barra de endereços
3. Confirme a instalação
4. O app será adicionado à tela inicial

### Funcionalidades Offline
- Cache de recursos estáticos
- Estratégia Network First
- Fallback para cache quando offline
- Requisições de API sempre online

## 🎯 Próximas Funcionalidades

- [ ] Parcelamentos de cobranças
- [ ] Detalhes de cobranças
- [ ] Contatos de pessoas
- [ ] Endereços de pessoas
- [ ] Upload de arquivos
- [ ] Dashboard com gráficos
- [ ] Relatórios em PDF
- [ ] Notificações push
- [ ] Modo escuro completo

## 📄 Licença

Este projeto foi desenvolvido como solução personalizada.

## 🤝 Suporte

Para dúvidas ou suporte, consulte a documentação da API em:
https://controlepesssoalapi-d8g6bbhedcd3cvfk.eastus-01.azurewebsites.net/swagger/index.html

