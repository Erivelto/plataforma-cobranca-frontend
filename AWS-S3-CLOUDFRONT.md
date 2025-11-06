# Deploy AWS S3 + CloudFront

## Para aplicações frontend apenas (sem servidor Node.js)

### 1. Build do frontend
```powershell
# Build apenas do frontend
cd client
npm install
npm run build
```

### 2. Deploy via AWS CLI
```powershell
# Configurar AWS CLI
aws configure

# Criar bucket S3
aws s3 mb s3://plataforma-cobranca-frontend-seu-nome

# Configurar bucket para hosting
aws s3 website s3://plataforma-cobranca-frontend-seu-nome --index-document index.html --error-document index.html

# Upload dos arquivos
aws s3 sync client/dist/ s3://plataforma-cobranca-frontend-seu-nome --delete

# Tornar público
aws s3api put-bucket-policy --bucket plataforma-cobranca-frontend-seu-nome --policy file://s3-policy.json
```

### 3. Criar CloudFront (CDN)
```powershell
# Via console AWS ou CLI
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Custo: $0.00/mês
- S3: 5GB gratuitos
- CloudFront: 50GB/mês + 2M requests gratuitos
- Route 53: $0.50/mês (opcional para domínio)