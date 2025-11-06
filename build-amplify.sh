#!/bin/bash

echo "🚀 Starting AWS Amplify Build Script"

# Criar diretórios necessários
echo "📁 Creating build directories..."
mkdir -p dist
mkdir -p client/dist

# Verificar versões
echo "📋 Environment info:"
node --version
npm --version

# Build do frontend
echo "🎨 Building frontend (React + Vite)..."
npm run dev &
sleep 2
kill %1
vite build

# Build do backend  
echo "🔧 Building backend (Node.js + esbuild)..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Verificar outputs
echo "✅ Build verification:"
echo "Frontend output:"
ls -la client/dist/ || echo "❌ Frontend build failed"

echo "Backend output:"
ls -la dist/ || echo "❌ Backend build failed"

echo "🎉 Build completed!"